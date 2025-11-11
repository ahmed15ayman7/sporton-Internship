'use client';

import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Role, User } from '@sporton/interfaces';
import { userApi } from '@sporton/apis';

// --- Interfaces ---
export interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

// --- Cookie Configuration ---
const COOKIE_CONFIG = {
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'sporton.club',
  path: '/',
  secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
  sameSite: 'lax' as const,
  httpOnly: false, // Must be false for client-side access
};

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

// --- Auth Service (Singleton Class) ---
class AuthService {
  private static instance: AuthService;
  private refreshTokenTimeout?: NodeJS.Timeout;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // --- Core Token Management ---

  public saveTokens(access_token: string, refresh_token: string): void {
    // Save access token for 1 hour
    setCookie(ACCESS_TOKEN_COOKIE, access_token, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    // Save refresh token for 30 days
    setCookie(REFRESH_TOKEN_COOKIE, refresh_token, {
      ...COOKIE_CONFIG,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  public getAccessToken(): string {
    return (getCookie(ACCESS_TOKEN_COOKIE) as string) || '';
  }

  public getRefreshToken(): string {
    return (getCookie(REFRESH_TOKEN_COOKIE) as string) || '';
  }

  public clearTokens(): void {
    deleteCookie(ACCESS_TOKEN_COOKIE, { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
    deleteCookie(REFRESH_TOKEN_COOKIE, { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
    this.stopRefreshTokenTimer();
  }

  // --- Refresh Token Logic ---

  public startRefreshTokenTimer(): void {
    this.stopRefreshTokenTimer(); // Clear any existing timer

    const accessToken = this.getAccessToken();
    if (!accessToken) return;

    try {
      const decodedToken = jwtDecode<{ exp: number }>(accessToken);
      const expires = new Date(decodedToken.exp * 1000);
      // Refresh 5 minutes before the token expires
      const timeout = expires.getTime() - Date.now() - 5 * 60 * 1000;

      if (timeout > 0) {
        console.log(`⏳ Token refresh scheduled in ${Math.round(timeout / 1000 / 60)} minutes.`);
        this.refreshTokenTimeout = setTimeout(async () => {
          console.log('🔄 Attempting to refresh token...');
          await this.refreshToken();
        }, timeout);
      }
    } catch (error) {
      console.error('Error starting refresh timer:', error);
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  public async refreshToken(): Promise<string | null> {
    const currentRefreshToken = this.getRefreshToken();
    if (!currentRefreshToken) {
      console.warn('No refresh token available for renewal.');
      await this.logout();
      return null;
    }

    try {
      const response = await fetch(`https://api.sporton.club/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: currentRefreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token, server responded with an error.');
      }

      const data = await response.json();
      const { access_token, refresh_token: new_refresh_token } = data;

      if (!access_token) {
        throw new Error('New access token not found in refresh response.');
      }

      // IMPROVEMENT: Handle refresh token rotation. Use the new one if provided, otherwise keep the old one.
      const finalRefreshToken = new_refresh_token || currentRefreshToken;
      
      console.log('✅ Token refreshed successfully.');
      this.saveTokens(access_token, finalRefreshToken);
      this.startRefreshTokenTimer(); // Restart the timer with the new token's expiry
      
      return access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.logout(); // Logout user if refresh fails
      return null;
    }
  }

  // --- Session and User Management ---
  
  public async getSession(): Promise<Session | null> {
    let accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken && refreshToken) {
        console.log('Access token expired or missing, trying to refresh...');
        accessToken = await this.refreshToken() ?? '';
    }

    if (!accessToken || !refreshToken) {
        return null;
    }

    try {
      const payload = jwtDecode<JWTPayload>(accessToken);
      // Check if the token is still valid after a potential refresh
      if (payload.exp * 1000 <= Date.now()) {
        console.warn('Token is still expired even after refresh attempt.');
        return null;
      }
      
      const user = await userApi.findUserById(payload.sub);
      return { user, access_token: accessToken, refresh_token: refreshToken };

    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    const session = await this.getSession();
    return session?.user || null;
  }
  
  public async isAuthenticated(): Promise<boolean> {
    const accessToken = this.getAccessToken();
    if (!accessToken) return false;

    try {
      const decoded = jwtDecode<{ exp: number }>(accessToken);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  public async logout(setUser?: (user: User | null) => void): Promise<void> {
    this.clearTokens();
    setUser?.(null);

    // Redirect to signin page if not already on an auth page
    if (typeof window !== 'undefined') {
        const authRoutes = ['/auth/signin', '/auth/signup', '/auth/reset-password', '/auth/forgot-password', '/auth/activate','/auth/callback','/auth/error',"/auth/verify-code"];
        if (!authRoutes.some(route => window.location.pathname.startsWith(route))) {
            window.location.href = '/auth/signin';
        }
    }
  }
}

// --- React Auth Context ---

interface AuthContextType {
  user: User | null;
  refetchUser: () => Promise<void>;
  login: (data: { access_token: string, refresh_token: string, user?: User }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // FIX: This is the critical part. Start the timer on app load if user is authenticated.
          authService.startRefreshTokenTimer();
          console.log('🔐 Session restored, refresh timer started.');
        }else{
          await authService.logout();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (data: { access_token: string, refresh_token: string }) => {
    setIsLoading(true);
    try {
      // SIMPLIFICATION: Only one function call needed to save tokens and start the timer.
      authService.saveTokens(data.access_token, data.refresh_token);
      authService.startRefreshTokenTimer();
      await refetchUser();
      console.log('✅ Login successful, refresh timer started.');
    } catch (error) {
      console.error('Login error in AuthProvider:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout(setUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const authService = AuthService.getInstance();
// 'use client';
// import { getCookie, setCookie, deleteCookie } from 'cookies-next';
// import { jwtDecode } from 'jwt-decode';
// import React from 'react';
// import { Role, User } from '@sporton/interfaces';

// // React Hooks
// import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
// import { userApi } from '@sporton/apis';

// export interface Session {
//   user: User;
//   access_token: string;
//   refresh_token: string;
// }

// export interface JWTPayload {
//   sub: string;
//   email: string;
//   role: Role;
//   iat: number;
//   exp: number;
// }

// interface TokenPayload {
//   exp: number;
//   user: {
//     id: string;
//     email: string;
//     role: string;
//   };
// }

// // تم إزالة JWT_SECRET و JWT_REFRESH_SECRET لأنها لا تستخدم في client-side

// // Cookie configuration constants
// const COOKIE_CONFIG = {
//   domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
//   path: '/',
//   secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
//   sameSite: 'lax' as const,
//   httpOnly: false, // Set to false for client-side access
// };

// interface AuthContextType {
//   user: User | null;
//   refetchUser: () => Promise<void>;
//   login: (data: { access_token: string, refresh_token: string, user?: User }) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// class AuthService {
//   private static instance: AuthService;
//   private refresh_tokenTimeout?: NodeJS.Timeout;

//   private constructor() { }

//   public static getInstance(): AuthService {
//     if (!AuthService.instance) {
//       AuthService.instance = new AuthService();
//     }
//     return AuthService.instance;
//   }

//   // JWT Token Management
//   // ملاحظة: هذه الدوال لا تعمل في المتصفح، يجب استخدامها في server-side فقط
//   public generateAccessToken(user: User): string {
//     console.warn('generateAccessToken: This function should only be used on server-side');
//     return '';
//   }

//   public generateRefreshToken(user: User): string {
//     console.warn('generateRefreshToken: This function should only be used on server-side');
//     return '';
//   }

//   public verifyToken(token: string): JWTPayload | null {
//     try {
//       // استخدام jwtDecode للقراءة فقط في المتصفح
//       const payload = jwtDecode<JWTPayload>(token);
      
//       // التحقق من انتهاء الصلاحية
//       if (payload.exp * 1000 <= Date.now()) {
//         return null;
//       }
      
//       return payload;
//     } catch (error) {
//       return null;
//     }
//   }

//   public verifyRefreshToken(token: string): JWTPayload | null {
//     try {
//       // استخدام jwtDecode للقراءة فقط في المتصفح
//       const payload = jwtDecode<JWTPayload>(token);
      
//       // التحقق من انتهاء الصلاحية
//       if (payload.exp * 1000 <= Date.now()) {
//         return null;
//       }
      
//       return payload;
//     } catch (error) {
//       return null;
//     }
//   }

//   // دالة مستقلة لحفظ التوكنات في cookies
//   public saveTokens(access_token: string, refresh_token: string,isSession:boolean=false): void {
//     if (!access_token || !refresh_token) {
//       console.error('Invalid tokens provided for saving');
//       return;
//     }

//     console.log('🍪 COOKIE: Saving tokens to cookies', {
//       domain: COOKIE_CONFIG.domain,
//       secure: COOKIE_CONFIG.secure,
//       sameSite: COOKIE_CONFIG.sameSite,
//       access_tokenLength: access_token.length,
//       refresh_tokenLength: refresh_token.length
//     });

//     // حفظ access token لمدة ساعة واحدة
//     setCookie(isSession?'sessionAccessToken':'access_token', access_token, {
//       ...COOKIE_CONFIG,
//       maxAge: 60 * 60, // 1 hour in seconds
//     });

//     // حفظ refresh token لمدة 30 يوم
//     setCookie(isSession?'sessionRefreshToken':'refresh_token', refresh_token, {
//       ...COOKIE_CONFIG,
//       maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
//     });

//     console.log('✅ SUCCESS: Tokens saved successfully to cookies');
    
//     // Debug: Check if cookies were actually set
//     setTimeout(() => {
//       const savedAccessToken = getCookie(isSession?'sessionAccessToken':'access_token');
//       const savedRefreshToken = getCookie(isSession?'sessionRefreshToken':'refresh_token');
//       console.log('🍪 COOKIE: Verification - Access Token saved:', !!savedAccessToken);
//       console.log('🍪 COOKIE: Verification - Refresh Token saved:', !!savedRefreshToken);
//     }, 100);
//   }

//   // تعيين التوكن عند تسجيل الدخول
//   public async setTokens(access_token: string, refresh_token: string) {
//     if (!access_token || !refresh_token) {
//       console.error('Invalid tokens provided');
//       return;
//     }

//     // حفظ التوكنات في cookies
//     this.saveTokens(access_token, refresh_token);

//     try {
//       this.startRefreshTokenTimer();
//     } catch (error) {
//       console.error('Error setting up refresh timer:', error);
//     }
//   }

//   // الحصول على التوكن من cookies
//   public getAccessTokenFromCookie(isSession:boolean=false): string {
//     const token = getCookie(isSession?'sessionAccessToken':'access_token') as string;
//     return token || '';
//   }

//   // الحصول على refresh token من cookies
//   public getRefreshTokenFromCookie(isSession:boolean=false): string {
//     const token = getCookie(isSession?'sessionRefreshToken':'refresh_token') as string;
//     return token || '';
//   }

//   // التحقق من حالة تسجيل الدخول
//   public async isAuthenticated(): Promise<boolean> {
//     const token = this.getAccessTokenFromCookie(true);
//     if (!token) return false;

//     try {
//       const decodedToken = jwtDecode<TokenPayload>(token);
//       return decodedToken.exp * 1000 > Date.now();
//     } catch {
//       return false;
//     }
//   }

//   // بدء مؤقت تجديد التوكن
//   private startRefreshTokenTimer() {
//     try {
//       const access_token = this.getAccessTokenFromCookie(true);
//       if (!access_token) return;

//       const decodedToken = jwtDecode<TokenPayload>(access_token);
//       const expires = new Date(decodedToken.exp * 1000);
//       const timeout = expires.getTime() - Date.now() - (5 * 60 * 1000); // تجديد قبل 5 دقائق من الانتهاء

//       if (timeout > 0) {
//         this.refresh_tokenTimeout = setTimeout(() => this.refresh_token(), timeout);
//       }
//     } catch (error) {
//       console.error('Error starting refresh timer:', error);
//     }
//   }

//   // إيقاف مؤقت تجديد التوكن
//   private stopRefreshTokenTimer() {
//     if (this.refresh_tokenTimeout) {
//       clearTimeout(this.refresh_tokenTimeout);
//     }
//   }

//   // تجديد التوكن
//   public async refresh_token(): Promise<string> {
//     try {
//       const refresh_token = this.getRefreshTokenFromCookie(true);
//       if (!refresh_token) {
//         throw new Error('No refresh token available');
//       }

//       const response = await fetch(` https://api.3de.school/auth/refresh-token`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           refresh_token: refresh_token
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to refresh token');
//       }

//       const data = await response.json();
//       const { access_token } = data;
      
//       // حفظ التوكن الجديد
//       this.saveTokens(access_token, refresh_token);
      
//       // إعادة تشغيل المؤقت
//       this.startRefreshTokenTimer();
      
//       return access_token;
//     } catch (error: any) {
//       console.error('Token refresh failed:', error);
//       await this.logout();
//       throw new Error('Failed to refresh token: ' + error.message);
//     }
//   }

//   // تسجيل الخروج
//   public async logout(setUser?: (user: User | null) => void) {
//     this.clearSession();
//     setUser?.(null);
//    await this.clearTokens();
    
    
//     // إيقاف المؤقت
//     this.stopRefreshTokenTimer();
    
//     // إعادة التوجيه إلى صفحة تسجيل الدخول
//     if (typeof window !== 'undefined') {
//       if (typeof window !== 'undefined') {
//         if( !window.location.href.includes('/auth/signin') && !window.location.href.includes('/auth/signup') && !window.location.href.includes('/auth/reset-password') && !window.location.href.includes('/auth/forgot-password') && !window.location.href.includes('/auth/verify-code') && !window.location.href.includes('/auth/activate') && !window.location.href.includes('/auth/callback') && !window.location.href.includes('/auth/error')){
//           window.location.href = '/auth/signin';
//         }
//       }
//     }
//   }

//   public async clearTokens() {
//     deleteCookie('sessionAccessToken', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     deleteCookie('sessionRefreshToken', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     deleteCookie('access_token', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     deleteCookie('refresh_token', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     this.stopRefreshTokenTimer();    
//   }

//   // Session Management
//   public async getSession(): Promise<Session | null> {
//     try {
//       const access_token = this.getAccessTokenFromCookie(true);
//       const refresh_token = this.getRefreshTokenFromCookie(true);
      
//       if (!access_token || !refresh_token) {
//         return null;
//       }

//       // استخدام jwtDecode للقراءة فقط بدلاً من التحقق من الصحة
//       try {
//         const payload = jwtDecode<JWTPayload>(access_token);
//         console.log('🔐 payload', payload);
        
//         // التحقق من انتهاء صلاحية التوكن
//         if (payload.exp * 1000 <= Date.now()) {
//           // التوكن منتهي الصلاحية، نحاول استخدام refresh token
//           const refreshPayload = jwtDecode<JWTPayload>(refresh_token);
          
//           if (refreshPayload.exp * 1000 <= Date.now()) {
//             // refresh token أيضاً منتهي الصلاحية
//             return null;
//           }
          
//           // إنشاء مستخدم من refresh token
//           const user=await userApi.findUserById(payload.sub)
//           console.log('🔐 user', user);
          
//           return {
//               user:user,
//             access_token,
//             refresh_token,
//           };
//         }
//         try{
//           console.log('🔐 payload.sub', payload.sub);
//         const user = await userApi.findUserById(payload.sub)
//         console.log('🔐 user', user);
//         return {
//           user:user,
//           access_token,
//           refresh_token,
//         };
//       }catch(error){
//         console.error('Error get user', error);
//         return null;
//       }
//       } catch (decodeError) {
//         console.error('Error decoding token:', decodeError);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error getting session:', error);
//       return null;
//     }
//   }

//   public setSession( access_token?: string, refresh_token?: string): void {
//     // إذا لم يتم تمرير التوكنات، نحاول الحصول عليها من الكوكيز
//     if (!access_token || !refresh_token) {
//       access_token = this.getAccessTokenFromCookie(true);
//       refresh_token = this.getRefreshTokenFromCookie(true);
//     }
    
//     // إذا كانت التوكنات متوفرة، نحفظها في الكوكيز
//     if (access_token && refresh_token) {
//       this.saveTokens(access_token, refresh_token, true);
//     }
//   }

//   public clearSession(): void {
//     deleteCookie('sessionAccessToken', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     deleteCookie('sessionRefreshToken', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     deleteCookie('access_token', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//     deleteCookie('refresh_token', { domain: COOKIE_CONFIG.domain, path: COOKIE_CONFIG.path });
//   }

//   // Role-based Authorization
//   public withRole(allowedRoles: Role[]) {
//     return (session: Session | null): boolean => {
//       if (!session || !session.user) {
//         return false;
//       }
      
//       return allowedRoles.includes(session.user.role as Role);
//     };
//   }

//   public hasRole(session: Session | null, role: Role): boolean {
//     return session?.user?.role === role;
//   }

//   public hasAnyRole(session: Session | null, roles: Role[]): boolean {
//     return session?.user ? roles.includes(session.user.role as Role) : false;
//   }

//   // Password Management
//   // ملاحظة: هذه الدوال لا تعمل في المتصفح، يجب استخدامها في server-side فقط
//   public async hashPassword(password: string): Promise<string> {
//     console.warn('hashPassword: This function should only be used on server-side');
//     return '';
//   }

//   public async comparePassword(password: string, hash: string): Promise<boolean> {
//     console.warn('comparePassword: This function should only be used on server-side');
//     return false;
//   }

//   // Middleware for Next.js
//   public createAuthMiddleware(allowedRoles: Role[]) {
//     return (req: any, res: any, next: any) => {
//       const access_token = req.cookies?.access_token;
      
//       if (!access_token) {
//         return res.status(401).json({ error: 'No access token provided' });
//       }
      
//       const payload = this.verifyToken(access_token);
//       if (!payload) {
//         return res.status(401).json({ error: 'Invalid access token' });
//       }
      
//       if (!allowedRoles.includes(payload.role)) {
//         return res.status(403).json({ error: 'Insufficient permissions' });
//       }
      
//       req.user = payload;
//       next();
//     };
//   }

//   // Route Protection HOC
//   public withAuth(allowedRoles: Role[]) {
//     return async (Component: React.ComponentType<any>) => {
//       return async (props: any) => {
//         const session = await this.getSession();
        
//         if (!session) {
//           // Redirect to login
//           if (typeof window !== 'undefined') {
//             window.location.href = '/auth/signin';
//           }
//           return null;
//         }
        
//         if (!allowedRoles.includes(session.user.role as Role)) {
//           // Redirect to unauthorized page
//           if (typeof window !== 'undefined') {
//             window.location.href = '/unauthorized';
//           }
//           return null;
//         }
        
//         return <Component {...props} session={session} />;
//       };
//     };
//   }

//   // API Route Protection
//   public protectApiRoute(allowedRoles: Role[]) {
//     return (handler: Function) => {
//       return async (req: any, res: any) => {
//         const access_token = req.cookies?.access_token;
        
//         if (!access_token) {
//           return res.status(401).json({ error: 'No access token provided' });
//         }
        
//         const payload = this.verifyToken(access_token);
//         if (!payload) {
//           return res.status(401).json({ error: 'Invalid access token' });
//         }
        
//         if (!allowedRoles.includes(payload.role)) {
//           return res.status(403).json({ error: 'Insufficient permissions' });
//         }
        
//         req.user = payload;
//         return handler(req, res);
//       };
//     };
//   }

//   // Utility Functions
//   public async isAuthenticatedSync(): Promise<boolean> {
//     const session = await this.getSession();
//     return !!session;
//   }

//   public async getCurrentUser(): Promise<User | null> {
//     const session = await this.getSession();
//     return session?.user || null;
//   }

//   public async getCurrentUserRole(): Promise<Role | null> {
//     const session = await this.getSession();
//     return session?.user?.role || null;
//   }

//   // Role-specific helpers
//   public isPlayer(session: Session | null): boolean { return this.hasRole(session, 'PLAYER'); }
//   public isCoach(session: Session | null): boolean { return this.hasRole(session, 'COACH'); }
//   public isAgent(session: Session | null): boolean { return this.hasRole(session, 'AGENT'); }
//   public isClub(session: Session | null): boolean { return this.hasRole(session, 'CLUB'); }
//   public isCompany(session: Session | null): boolean { return this.hasRole(session, 'COMPANY'); }
//   public isScout(session: Session | null): boolean { return this.hasRole(session, 'SCOUT'); }
//   public isTrainer(session: Session | null): boolean { return this.hasRole(session, 'TRAINER'); }

//   // Permission-based helpers
//   public canAccessPlayerFeatures(session: Session | null): boolean { 
//     return this.hasAnyRole(session, ['PLAYER', 'COACH', 'AGENT', 'CLUB', 'COMPANY', 'SCOUT', 'TRAINER']); 
//   }

//   public canAccessCoachFeatures(session: Session | null): boolean { 
//     return this.hasAnyRole(session, ['COACH', 'TRAINER']); 
//   }

//   public canAccessAgentFeatures(session: Session | null): boolean { 
//     return this.hasRole(session, 'COMPANY'); 
//   }

//   public canAccessClubFeatures(session: Session | null): boolean { 
//     return this.hasAnyRole(session, ['CLUB', 'COMPANY', 'SCOUT', 'TRAINER']); 
//   }

//   public canAccessCompanyFeatures(session: Session | null): boolean { 
//     return this.hasAnyRole(session, ['COMPANY', 'SCOUT', 'TRAINER']); 
//   }

//   public canAccessScoutFeatures(session: Session | null): boolean { 
//     return this.hasAnyRole(session, ['SCOUT', 'TRAINER']); 
//   }

//   public canAccessTrainerFeatures(session: Session | null): boolean { 
//     return this.hasAnyRole(session, ['TRAINER']); 
//   }
// }


// export function AuthProvider({ children }: { children: ReactNode }) {

//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
// const refetchUser =async()=>{
//   const session = await authService.getSession();
//   if(session){
//     let user= await userApi.findUserById(session.user.id)
//     setUser(user);
//   }
// }
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const isAuth = await authService.isAuthenticatedSync();
//         console.log('🔐 isAuth', isAuth);
//         if (isAuth) {
//           const currentUser = await authService.getCurrentUser();
//           setUser(currentUser);
//           console.log('🔐 currentUser', currentUser);
//         }else{
//           if(typeof window !== 'undefined'){
//            if(window.location.href !== '/auth/signin'){
//              authService.logout(setUser);
//            }

//           }
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   const login = async (data: { access_token: string, refresh_token: string, user?: User }) => {
//     setIsLoading(true);
//     try {
      
//       authService.setSession( data.access_token, data.refresh_token);
      
//       // تعيين التوكنات وبدء المؤقت
//       await authService.setTokens(data.access_token, data.refresh_token);
//       await refetchUser();
//       console.log('✅ SUCCESS: AuthProvider.login() completed successfully');
//     } catch (error) {
//       console.error('❌ ERROR: Login error in AuthProvider:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     await authService.logout(setUser);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isLoading, refetchUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// // Export singleton instance
// export const authService = AuthService.getInstance();
// export const formatTime = (sec: number) => {
//   const minutes = Math.floor(sec / 60);
//   const seconds = Math.floor(sec % 60);
//   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
// };

// // Export individual functions for convenience
// export const {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyToken,
//   verifyRefreshToken,
//   saveTokens,
//   getSession,
//   setSession,
//   clearSession,
//   withRole,
//   hasRole,
//   hasAnyRole,
//   hashPassword,
//   comparePassword,
//   createAuthMiddleware,
//   withAuth,
//   protectApiRoute,
//   isAuthenticatedSync,
//   getCurrentUser,
//   getCurrentUserRole,
//   isPlayer,
//   isCoach,
//   isAgent,
//   isClub,
//   isCompany,
//   isScout,
//   isTrainer,
//   canAccessPlayerFeatures,
//   canAccessCoachFeatures,
//   canAccessAgentFeatures,
//   canAccessClubFeatures,
//   canAccessCompanyFeatures,
//   canAccessScoutFeatures,
//   canAccessTrainerFeatures,
// } = authService; 