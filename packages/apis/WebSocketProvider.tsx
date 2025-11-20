'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { wsClient, UserStatusEvent } from './websocketClient';

interface User {
    id: string;
    name: string;
    email: string;
    isOnline: boolean;
}

interface WebSocketContextType {
    isConnected: boolean;
    connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
    onlineUsers: string[];
    sendMessage: (message: any) => void;
    socket: any;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
    user?: User;
    autoConnect?: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
    children, 
    user, 
    autoConnect = true 
}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!user?.id || !autoConnect) return;

        // دالة معالجة حدث حالة المستخدم
        const handleUserStatus = (event: UserStatusEvent) => {
            console.log('WebSocket Provider - User status event:', event);
            
            setOnlineUsers(prev => {
                const newSet = new Set(prev);
                if (event.isOnline) {
                    newSet.add(event.userId);
                } else {
                    newSet.delete(event.userId);
                }
                return newSet;
            });
        };

        // إضافة مستمع لحدث حالة المستخدم
        wsClient.onUserStatus(handleUserStatus);

        // الاتصال عند mount مع معالجة محسنة للأخطاء
        const connectWebSocket = async () => {
            try {
                setConnectionStatus('connecting');
                await wsClient.connect(user.id);
                
                // فحص حالة الاتصال الفعلية
                if (wsClient.isConnected()) {
                    setIsConnected(true);
                    setConnectionStatus('connected');
                    console.log('✅ WebSocket Provider - Connected successfully');
                } else {
                    // الاتصال لم ينجح لكن التطبيق سيستمر
                    setIsConnected(false);
                    setConnectionStatus('disconnected');
                    console.warn('⚠️ WebSocket Provider - Connection failed, continuing without real-time features');
                }
            } catch (error) {
                setConnectionStatus('disconnected');
                setIsConnected(false);
                console.warn('⚠️ WebSocket Provider - Connection error (non-critical):', error);
            }
        };

        connectWebSocket();

        // تنظيف عند unmount
        return () => {
            // إزالة مستمع الأحداث
            wsClient.offUserStatus(handleUserStatus);
            
            // قطع الاتصال
            wsClient.disconnect(user.id).catch(error => {
                console.error('WebSocket Provider - Error disconnecting:', error);
            });
        };
    }, [user?.id, autoConnect]);

    // دالة إرسال الرسائل
    const sendMessage = (message: any) => {
        if (wsClient.isConnected()) {
            wsClient.emit('message', message);
        } else {
            console.warn('WebSocket not connected, cannot send message');
        }
    };

    const contextValue: WebSocketContextType = {
        isConnected,
        connectionStatus,
        onlineUsers: Array.from(onlineUsers),
        sendMessage,
        socket: wsClient.getSocket()
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook للاستخدام في Components
export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

// Hook للحصول على معلومات الاتصال فقط
export const useWebSocketConnection = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        return {
            isConnected: false,
            connectionStatus: 'disconnected' as const,
            socket: null
        };
    }
    return {
        isConnected: context.isConnected,
        connectionStatus: context.connectionStatus,
        socket: context.socket
    };
};

// Hook للحصول على المستخدمين المتصلين
export const useOnlineUsers = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        return [];
    }
    return context.onlineUsers;
};

// Hook لإرسال الرسائل
export const useWebSocketMessage = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        return () => console.warn('WebSocket not available');
    }
    return context.sendMessage;
};

