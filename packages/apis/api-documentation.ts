import { ContactUs, User } from '@sporton/interfaces';
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
  static user = {
    findUserById: (id: string) => ({
        method: 'GET',
        path:  '/users/me',
        description: 'الحصول على المستخدم الحالي'
    }),
    updateUser: (id: string, data: Partial<User>) => ({
        method: 'PUT',
        path:  `/users/${id}`,
        description: 'تحديث المستخدم',
        parameters: {
            path: { id },
            body: data
        }
    }),
  }
   /**
     * التسجيل والدخول
     */
 static authAdmin = {
    /**
     * التسجيل
     */
    register: (data: User) => ({
        method: 'POST',
        path:  '/auth-admin/register',
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
        path:  '/auth-admin/login',
        description: 'الدخول',
        parameters: {
            body: data
        }
    }),
    /**
     * التحقق من الحساب
     */
    activateAccount: (data: { email: string, otp: string }) => ({
        method: 'POST',
        path:  '/auth-admin/activate-account',
        description: 'التحقق من الحساب'
    }),
    /**
     * الخروج
     */
    logout: () => ({
        method: 'POST',
        path:  '/auth-admin/logout',
        description: 'الخروج'
    }),
    /**
     * التحقق من التوكن
     */
    refresh_token: () => ({
        method: 'POST',
        path:  '/auth-admin/refresh',
        description: 'التحقق من التوكن'
    }),

    /**
     * إعادة تعيين كلمة المرور
     */
    forgotPassword: (data: { email: string }) => ({
        method: 'POST',
        path:  '/auth-admin/forgot-password',
        description: 'إعادة تعيين كلمة المرور',
        parameters: {
            body: data
        }
    }),
    resetPassword: (data: { token: string, password: string }) => ({
        method: 'POST',
        path:  '/auth-admin/reset-password',
        description: 'إعادة تعيين كلمة المرور',
        parameters: {
            body: data
        }
    })

};
  static contact = {
    createContact: (data: Partial<ContactUs>) => ({
      method: 'POST',
      path:  '/contact',
      description: 'إنشاء الاتصال'
    }),
  }
  static admins = {
    getAll: () => ({
        method: 'GET',
        path:  '/admins',
        description: 'الحصول على قائمة المشرفين'
    }),
    getById: (id: string) => ({
        method: 'GET',
        path: `/admins/${id}`,
        description: 'الحصول على تفاصيل مشرف محدد',
        parameters: {
            path: { id }
        }
    }),
    create: (data: any) => ({
        method: 'POST',
        path:  '/admins',
        description: 'إنشاء مشرف جديد',
        parameters: {
            body: data
        }
    }),
    update: (id: string, data: any) => ({
        method: 'PUT',
        path: `/admins/${id}`,
        description: 'تحديث بيانات مشرف',
        parameters: {
            path: { id },
            body: data
        }
    }),
    delete: (id: string) => ({
        method: 'DELETE',
        path: `/admins/${id}`,
        description: 'حذف مشرف',
        parameters: {
            path: { id }
        }
    }),
    getAdminProfile: (id: string) => ({
        method: 'GET',
        path: `/admins/${id}/profile`,
        description: 'الحصول على تفاصيل مشرف محدد',
        parameters: {
            path: { id }
        }
    }),
    getAdminNotifications: (id: string) => ({
        method: 'GET',
        path: `/admins/${id}/notifications`,
        description: 'الحصول على قائمة الإشعارات',
        parameters: {
            path: { id }
        }
    })};

static monitor = {
  getDashboardOverview: (userId: string) => ({
    method: 'GET',
    path: `/monitor/dashboard/overview`,
    description: 'الحصول على معاينة الرئيسية',
    parameters: {
      path: { userId }
    }
  }),
  getDashboardMetrics: (userId: string) => ({
    method: 'GET',
    path: `/monitor/dashboard/metrics`,
    description: 'الحصول على معاينة الرئيسية',
    parameters: {
      path: { userId }
    }
  })
}}
export default ApiClient;
