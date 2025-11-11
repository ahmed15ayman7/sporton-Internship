"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api, { API_URL , ApiClient } from "./index";
import axios from "axios";
import { User } from "@sporton/interfaces";
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        skip: number;
        take: number;
        hasMore: boolean;
    };
} 
export interface PaginationInterface {
    skip?: number;
    take?: number;
    orderBy?: string;
    search?: string;
    filters?: string;
} 
export async function getAccessTokenFromCookieServer(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value as string;
  return token || '';
}
export async function setAccessTokenToCookieServer(access_token: string,refresh_token: string) {
  const cookieStore = await cookies();
    // حفظ التوكن في الكوكيز
    cookieStore.set('access_token', access_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 // 1 hour
    });
    
    cookieStore.set('refresh_token', refresh_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });
}
export async function getRefreshTokenFromCookieServer(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get('refresh_token')?.value as string;
  console.log("token",99999,token)
  return token || '';
}
export async function refresh_tokenServer(): Promise<{access_Token:string,refresh_token:string}> {
  try {
    const cookieStore = await cookies();
    const refreshT = cookieStore.get('refresh_token')?.value as string;
    console.log("refreshT",refreshT)
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refresh_token: refreshT || ''
    });
    console.log("response",response)
    const { access_Token } = response.data;
    console.log("access_Token",access_Token)
    return {access_Token,refresh_token:refreshT};
  } catch (error: any) {
    await logout();
    return {access_Token:"",refresh_token:""};
  }
} 
export async function logoutServer() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

//?? Auth Api's Start
export async function signup(data: Partial<User>) {
    let {path} = ApiClient.auth.signup(data as User);
  const response = await api.post(path,data);
  return {status:response.status,data:response.data};
}
export async function login(data: { email: string, password: string, rememberMe: boolean }): Promise<{access_token:string,refresh_token:string}> {
    let {path} = ApiClient.auth.login(data);
    const response = await api.post(path,data);
    return response.data;
}
export async function logout() {
  await logoutServer();
  redirect('/login');
}
export async function findUserById(id: string) {
  let {path} = ApiClient.user.findUserById(id);
  const response = await api.get(path);
  return response.data;
}