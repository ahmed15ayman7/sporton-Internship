import { User } from '@sporton/interfaces';
import { PaginationInterface } from './serverActions';
/**
* توثيق نقاط النهاية API
* هذا الملف يحتوي على توثيق كامل لجميع نقاط النهاية API في النظام
*/

// تعريف الكلاس الرئيسي للـ API
export class ApiClient {
    private static baseURL: string = '';

    /**
     * تكوين المعاملات للروابط
     * @param params المعاملات المراد إضافتها للرابط
     * @returns رابط مع المعاملات المضافة
     */
    private static configureParams(params?: Record<string, any>): string {
        if (!params) return '';
        return Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    }

    /**
     * التسجيل والدخول
     */
    static auth = {
        /**
         * التسجيل
         */
        signup: (data: User) => ({
            method: 'POST',
            path:  '/auth/register',
            description: 'التسجيل',
            parameters: {
                body: data
            }
        }),
        /**
         * الدخول
         */
        login: (data: { email: string, password: string }) => ({
            method: 'POST',
            path:  '/auth/login',
            description: 'الدخول',
            parameters: {
                body: data
            }
        }),
        logout: () => ({
            method: 'POST',
            path:  '/auth/logout',
            description: 'الخروج'
        }),
        /**
         * التحقق من التوكن
         */
        refresh_token: () => ({
            method: 'POST',
            path:  '/auth/refresh',
            description: 'التحقق من التوكن'
        }),
    }
  
}
export default ApiClient;
