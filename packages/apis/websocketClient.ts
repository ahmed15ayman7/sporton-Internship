import { io, Socket } from 'socket.io-client';
import { userApi } from './index';
import { authService } from './index';

interface UserStatusEvent {
    userId: string;
    isOnline: boolean;
}

type UserStatusCallback = (event: UserStatusEvent) => void;

class WebSocketClient {
    private static instance: WebSocketClient;
    private socket: Socket | null = null;
    private isConnecting: boolean = false;
    private userStatusCallbacks: UserStatusCallback[] = [];
    private currentUserId: string | null = null;
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private connectionRetries: number = 0;
    private maxRetries: number = 3;

    private constructor() {}

    public static getInstance(): WebSocketClient {
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient();
        }
        return WebSocketClient.instance;
    }

    /**
     * الاتصال بالسيرفر مع معالجة محسنة للأخطاء
     */
    public async connect(userId: string): Promise<void> {
        if (this.socket?.connected || this.isConnecting) {
            console.log('WebSocket already connected or connecting');
            return;
        }

        // منع المحاولات المفرطة
        if (this.connectionRetries >= this.maxRetries) {
            console.warn('Max WebSocket connection retries reached, skipping connection');
            return;
        }

        this.isConnecting = true;
        this.currentUserId = userId;

        try {
            // الحصول على التوكن الحالي
            const token = await authService.getAccessTokenFromCookie();
            
            if (!token) {
                console.warn('No authentication token available, skipping WebSocket connection');
                this.isConnecting = false;
                return;
            }

            // إنشاء اتصال Socket.IO مع إعدادات محسنة
            this.socket = io(process.env.NEXT_PUBLIC_API_URL , {
                auth: {
                    token: token
                },
                transports: ['polling', 'websocket'], // البدء بـ polling كـ fallback
                reconnection: false, // سنتحكم في الإعادة الاتصال يدوياً
                timeout: 8000, // 8 ثوان timeout
                forceNew: true,
                autoConnect: false
            });

            // إعداد مستمعي الأحداث
            this.setupEventListeners();

            // الاتصال اليدوي مع Promise
            return new Promise<void>((resolve) => {
                const timeout = setTimeout(() => {
                    console.warn('WebSocket connection timeout - continuing without WebSocket');
                    this.isConnecting = false;
                    this.connectionRetries++;
                    this.scheduleReconnect();
                    resolve(); // Always resolve to not break app flow
                }, 8000);

                this.socket!.once('connect', () => {
                    clearTimeout(timeout);
                    this.isConnecting = false;
                    this.connectionRetries = 0; // Reset on successful connection
                    console.log('✅ WebSocket connected successfully');
                    resolve();
                });

                this.socket!.once('connect_error', (error) => {
                    clearTimeout(timeout);
                    this.isConnecting = false;
                    this.connectionRetries++;
                    console.warn(`⚠️ WebSocket connection failed (attempt ${this.connectionRetries}/${this.maxRetries}):`, error.message);
                    this.scheduleReconnect();
                    resolve(); // Always resolve to not break app flow
                });

                // محاولة الاتصال
                this.socket!.connect();
            });

        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.isConnecting = false;
            this.connectionRetries++;
            this.scheduleReconnect();
        }
    }

    /**
     * جدولة إعادة الاتصال التلقائي
     */
    private scheduleReconnect(): void {
        if (this.connectionRetries >= this.maxRetries) {
            console.warn('Max reconnection attempts reached, stopping reconnection');
            return;
        }

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        const delay = Math.min(1000 * Math.pow(2, this.connectionRetries), 30000); // Exponential backoff, max 30s
        console.log(`🔄 Scheduling WebSocket reconnection in ${delay/1000} seconds`);
        
        this.reconnectTimeout = setTimeout(() => {
            if (this.currentUserId && !this.socket?.connected && !this.isConnecting) {
                this.connect(this.currentUserId);
            }
        }, delay);
    }

    /**
     * إعداد مستمعي الأحداث
     */
    private setupEventListeners(): void {
        if (!this.socket) return;
            // 🔥 أي حدث جديد من السيرفر هيوصل هنا
            this.socket.onAny((event, ...args) => {
                console.log('📥 Event received:', event, args);
                if(event==="notification"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('new-notification', { detail: args[0] }));
                }
                else if(event==="message"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('new-message', { detail: args[0] }));
                }
                else if(event==="userTyping"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('userTyping', { detail: args[0] }));
                }
                else if(event==="userStoppedTyping"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('userStoppedTyping', { detail: args[0] }));
                }
                else if(event==="userRecording"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('userRecording', { detail: args[0] }));
                }
                else if(event==="userStoppedRecording"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('userStoppedRecording', { detail: args[0] }));
                }
                else if(event==="notificationRead"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('notificationRead', { detail: args[0] }));
                }
                else if(event==="read-message"){
                  console.log('data', args[0]);
                  window.dispatchEvent(new CustomEvent('read-message', { detail: args[0] }));
                }
              });
        this.socket.on('connect', () => {
            console.log('✅ WebSocket connection established');
            if (this.currentUserId) {
                this.updateUserStatus(this.currentUserId, true);
            }
        });

        this.socket.on('disconnect', (reason) => {
            console.log('🔌 WebSocket disconnected:', reason);
            if (reason === 'io server disconnect') {
                // Server initiated disconnect, try to reconnect
                this.scheduleReconnect();
            }
        });

        this.socket.on('connect_error', (error) => {
            console.warn('🚨 WebSocket connection error:', error.message);
        });

        this.socket.on('user_status', (event: UserStatusEvent) => {
            this.userStatusCallbacks.forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error('Error in user status callback:', error);
                }
            });
        });

        // Handle reconnection events
        this.socket.on('reconnect', (attemptNumber) => {
            console.log(`🔄 WebSocket reconnected after ${attemptNumber} attempts`);
            this.connectionRetries = 0;
        });

        this.socket.on('reconnect_error', (error) => {
            console.warn('🚨 WebSocket reconnection failed:', error.message);
        });
        this.socket.on('notification', (notification: any) => {
            console.log('🔔 إشعار جديد:', notification);
            
            // إرسال إشعار عام لتطبيق React
            window.dispatchEvent(new CustomEvent('new-notification', { detail: notification }));
          });
    }

    /**
     * تحديث حالة المستخدم
     */
    private async updateUserStatus(userId: string, isOnline: boolean): Promise<void> {
        try {
            if (this.socket?.connected) {
                this.socket.emit('user_status_update', { userId, isOnline });
            }
            
            // Update status via REST API as fallback
            await userApi.updateUser(userId, { isOnline: isOnline });
        } catch (error) {
            console.warn('Failed to update user status:', error);
        }
    }

    /**
     * قطع الاتصال وتنظيف الموارد
     */
    public async disconnect(userId?: string): Promise<void> {
        try {
            // Clear reconnection timeout
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }

            // Update user status to offline
            if (userId || this.currentUserId) {
                await this.updateUserStatus(userId || this.currentUserId!, false);
            }

            // Disconnect socket
            if (this.socket) {
                this.socket.disconnect();
                this.socket.removeAllListeners();
                this.socket = null;
            }

            // Reset state
            this.isConnecting = false;
            this.connectionRetries = 0;
            this.currentUserId = null;
            
            console.log('🔌 WebSocket disconnected and cleaned up');
        } catch (error) {
            console.error('Error during WebSocket disconnect:', error);
        }
    }

    /**
     * التحقق من حالة الاتصال
     */
    public isConnected(): boolean {
        return this.socket?.connected ?? false;
    }

    /**
     * إرسال حدث عبر WebSocket
     */
    public emit(event: string, data: any): void {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        } else {
            console.warn(`Cannot emit '${event}' - WebSocket not connected`);
        }
    }

    /**
     * الاستماع لحدث معين
     */
    public on(event: string, callback: (data: any) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    /**
     * إزالة مستمع حدث
     */
    public off(event: string, callback?: (data: any) => void): void {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    /**
     * إضافة مستمع لأحداث حالة المستخدم
     */
    public onUserStatus(callback: UserStatusCallback): void {
        this.userStatusCallbacks.push(callback);
    }

    /**
     * إزالة مستمع أحداث حالة المستخدم
     */
    public offUserStatus(callback: UserStatusCallback): void {
        const index = this.userStatusCallbacks.indexOf(callback);
        if (index > -1) {
            this.userStatusCallbacks.splice(index, 1);
        }
    }
    public onNotification(callback: (data: any) => void): void {
        if (this.socket) {
            this.socket.onAny((event, ...args) => {
                console.log("--------------------------------");
                console.log("event",event);
                console.log("args",args);
                if(event==="notification"){
                    callback(args[0]);
                }
            });
        }
    }
    public offNotification(callback: (data: any) => void): void {
        if (this.socket) {
            this.socket.offAny((event, ...args) => {
                if(event==="notification"){
                    callback(args[0]);
                }
            });
        }
    }

    /**
     * الحصول على Socket instance
     */
    public getSocket(): Socket | null {
        return this.socket;
    }

    /**
     * إعادة تعيين حالة الاتصال (للاستخدام في حالات خاصة)
     */
    public resetConnection(): void {
        this.connectionRetries = 0;
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
    }
}

// تصدير instance واحد
export const wsClient = WebSocketClient.getInstance();
export { WebSocketClient };
export default wsClient;
export type { UserStatusEvent, UserStatusCallback };