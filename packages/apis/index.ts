import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import * as serverActions from './serverActions';
import { ApiClient } from './api-documentation';

//?? API Configuration
export const API_URL = 'http://localhost:4000'; // added /api

interface TokenPayload {
  exp: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

class AuthService {
    private static instance: AuthService;
    private refresh_tokenTimeout?: NodeJS.Timeout;
    private access_token: string = '';
    private refresh_token: string = '';
  
    private constructor() { }
  
    public static getInstance(): AuthService {
      if (!AuthService.instance) {
        AuthService.instance = new AuthService();
      }
      return AuthService.instance;
    }
  
    // ?? تعيين التوكن عند تسجيل الدخول
    public async setTokens(access_token: string, refresh_token: string) {
      if (!access_token || !refresh_token) {
        console.error('Invalid tokens provided');
        return;
      }
  
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      await serverActions.setAccessTokenToCookieServer(access_token,refresh_token);
  
      try {
        this.startRefreshTokenTimer();
      } catch (error) {
        console.error('Error setting up refresh timer:', error);
      }
    }
  
    // ?? الحصول على التوكن الحالي
    public async getAccessTokenFromCookie(): Promise<string> {
      const token = await serverActions.getAccessTokenFromCookieServer();
      return token || this.access_token || '';
    }
  
    // ?? التحقق من حالة تسجيل الدخول
    public async isAuthenticated(): Promise<boolean> {
      const token = await this.getAccessTokenFromCookie();
      if (!token) return false;
  
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        return decodedToken.exp * 1000 > Date.now();
      } catch {
        return false;
      }
    }
  
    // ?? بدء مؤقت تجديد التوكن
    private startRefreshTokenTimer() {
      try {
        const decodedToken = jwtDecode<TokenPayload>(this.access_token);
        const expires = new Date(decodedToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 5000); // ?? تجديد قبل  5 دقائق من الانتهاء
  
        this.refresh_tokenTimeout = setTimeout(() => this.refreshtoken(), timeout);
      } catch (error) {
        console.error('Error starting refresh timer:', error);
      }
    }
  
    // ?? إيقاف مؤقت تجديد التوكن
    private stopRefreshTokenTimer() {
      if (this.refresh_tokenTimeout) {
        clearTimeout(this.refresh_tokenTimeout);
      }
    }
  
    // ?? تجديد التوكن
    public async refreshtoken(): Promise<string> {
      try {
        const {access_Token,refresh_token} = await serverActions.refresh_tokenServer();
        await this.setTokens(access_Token, refresh_token||this.refresh_token);
        return access_Token;
      } catch (error: any) {
        await this.logout();
        return "";
      }
    }
  
    // ?? تسجيل الخروج
    public async logout() {
      await serverActions.logoutServer();
      this.stopRefreshTokenTimer();
      
      if (typeof window !== 'undefined') {
            if(!window.location.href.includes('/auth-admin/signin') && !window.location.href.includes('/auth-admin/signup') && !window.location.href.includes('/auth-admin/reset-password') && !window.location.href.includes('/auth-admin/forgot-password') && !window.location.href.includes('/auth-admin/callback') && !window.location.href.includes('/auth-admin/error')){
            window.location.href = '/auth-admin/signin';
        }
      }
    }
  
    public async clearTokens() {
      this.access_token = '';
      this.refresh_token = '';
      await serverActions.logoutServer();
      this.stopRefreshTokenTimer();    
    }
  }
  
  const authService = AuthService.getInstance();
  
  const api = axios.create({
      baseURL: API_URL,
      headers: {
          'Content-Type': 'application/json',
      },
  });
  
  // ?? Interceptor للطلبات
  api.interceptors.request.use(
      async (config) => {
          const access_token = await authService.getAccessTokenFromCookie();
          if (access_token) {
              config.headers.Authorization = `Bearer ${access_token}`;
          }
          return config;
      },
      (error) => {
          console.log(error)
          return Promise.reject(error);
      }
  );
  
  // ?? Interceptor للردود
  api.interceptors.response.use(
      (response) => response,
      async (error) => {
          const originalRequest = error.config;
  
          // ?? إذا كان الخطأ 401 ولم نكن نحاول تجديد التوكن بالفعل
          if (error.response?.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
  
              try {
                  const refresh_token = await authService.refreshtoken();
                  console.log("refresh_token",refresh_token)
                  const response = await axios.post(`${API_URL}/auth/refresh`, {
                      refresh_token,
                  });
  
                  const { access_token } = response.data;
                  await authService.setTokens(access_token, refresh_token);
                  originalRequest.headers.Authorization = `Bearer ${access_token}`;
  
                  return api(originalRequest);
              } catch (refreshError) {
                  // ?? إذا فشل تجديد التوكن، نوجه المستخدم لصفحة تسجيل الدخول
                  await authService.logout();
                  return Promise.reject(refreshError);
              }
          }
  
          return Promise.reject(error);
      }
  );
  //!! Interceptor End

//?? Api's Start
//?? Auth Api's Start
export const authApi = {
  signup: serverActions.signup,
  login: serverActions.login,
  logout: serverActions.logout,
  setAccessTokenToCookieServer: serverActions.setAccessTokenToCookieServer,
  getAccessTokenFromCookieServer: serverActions.getAccessTokenFromCookieServer,
  getRefreshTokenFromCookieServer: serverActions.getRefreshTokenFromCookieServer,
}
//!! Auth Api's End
//?? AuthAdmin Api's Start
export const authAdminApi = {
  registerAdmin: serverActions.registerAdmin,
  loginAdmin: serverActions.loginAdmin,
  logoutAdmin: serverActions.logout_admin,
  refreshToken: serverActions.refresh_tokenAdmin,
  forgotPassword: serverActions.forgotPasswordAdmin,
  resetPassword: serverActions.resetPasswordAdmin,
};
//!! AuthAdmin Api's End
//?? User Api's Start
export const userApi = {
  findUserById: serverActions.findUserById,
  updateUser: serverActions.updateUser,
}
//!! User Api's End
//?? Admins Api's Start
export const adminsApi = {
  getAllAdmins: serverActions.getAllAdmins,
  getAdminById: serverActions.getAdminById,
  createAdmin: serverActions.createAdmin,
  updateAdmin: serverActions.updateAdmin,
  deleteAdmin: serverActions.deleteAdmin,
  getAdminProfile: serverActions.getAdminProfile,
  getAdminNotifications: serverActions.getAdminNotifications,
};
//!! Admins Api's End
//?? Monitor Api's Start
export const monitorApi = {
  getDashboardOverview: serverActions.getDashboardOverview,
  getDashboardMetrics: serverActions.getDashboardMetrics,
};
//!! Monitor Api's End

//?? Contact Api's Start
export const contactUs = {
  createContact: serverActions.createContact,
}
// WebSocket Client
export { wsClient, WebSocketClient } from './websocketClient';
export type { UserStatusEvent, UserStatusCallback } from './websocketClient';

// WebSocket Provider and Hooks
export { 
    WebSocketProvider, 
    useWebSocket, 
    useWebSocketConnection, 
    useOnlineUsers, 
    useWebSocketMessage 
} from './WebSocketProvider';

//!! Contact Api's End
export default api;
export { ApiClient };
export { authService };
