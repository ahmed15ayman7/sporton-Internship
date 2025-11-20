'use client';

import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AdminRole, Admin } from '@sporton/interfaces';
import { adminsApi  } from '@sporton/apis';

// --- Interfaces ---
export interface Session {
  admin: Admin;
  access_token: string;
  refresh_token: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: AdminRole;
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
      const response = await fetch(`http://localhost:3000/auth-admin/refresh`, {
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
      await this.logout(); // Logout admin if refresh fails
      return null;
    }
  }

  // --- Session and Admin Management ---
  
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
      
      const admin = await adminsApi.getAdminById(payload.sub);
      return { admin:admin.data, access_token: accessToken, refresh_token: refreshToken };

    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  public async getCurrentAdmin(): Promise<Admin | null> {
    const session = await this.getSession();
    return session?.admin || null;
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

  public async logout(setAdmin?: (admin: Admin | null) => void): Promise<void> {
    this.clearTokens();
    setAdmin?.(null);

    // Redirect to signin page if not already on an auth page
    if (typeof window !== 'undefined') {
        const authRoutes = ['/auth-admin/signin', '/auth-admin/signup', '/auth-admin/reset-password', '/auth-admin/forgot-password'];
        if (!authRoutes.some(route => window.location.pathname.startsWith(route))) {
            window.location.href = '/auth-admin/signin';
        }
    }
  }
}

// --- React Auth Context ---

interface AuthContextType {
  admin: Admin | null;
  refetchAdmin: () => Promise<void>;
  login: (data: { access_token: string, refresh_token: string, admin?: Admin }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthAdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchAdmin = async () => {
    const currentAdmin = await authService.getCurrentAdmin();
    setAdmin(currentAdmin);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentAdmin = await authService.getCurrentAdmin();
        if (currentAdmin) {
          setAdmin(currentAdmin);
          // FIX: This is the critical part. Start the timer on app load if admin is authenticated.
          authService.startRefreshTokenTimer();
          console.log('🔐 Session restored, refresh timer started.');
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
      await refetchAdmin();
      console.log('✅ Login successful, refresh timer started.');
    } catch (error) {
      console.error('Login error in AuthProvider:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout(setAdmin);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoading, refetchAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthAdmin(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthAdmin must be used within an AuthProvider');
  }
  return context;
}

export const authService = AuthService.getInstance();
