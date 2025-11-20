"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api, { API_URL , ApiClient } from "./index";
import axios from "axios";
import { Admin, ContactUs, User } from "@sporton/interfaces";
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
export async function updateUser(id: string, data: Partial<User>) {
  let {path} = ApiClient.user.updateUser(id,data);
  const response = await api.put(path,data);
  return response.data;
}
export async function createContact(data: Partial<ContactUs>) {
  let {path} = ApiClient.contact.createContact(data);
  const response = await api.post(path,data);
  return response.data;
}

//?? AuthAdmin Api's Start
export async function registerAdmin(data: Partial<User>) {
  let {path} = ApiClient.authAdmin.register(data as User);
const response = await api.post(path,data);
return {status:response.status,data:response.data};
}
export async function loginAdmin(data: { email: string, password: string, rememberMe: boolean, device?: string, ip?: string, browser?: string, os?: string }): Promise<{status:number,data:any}> {
try {
  let {path} = ApiClient.authAdmin.login(data);
  const response = await api.post(path,data);
  return {status:response.status,data:response.data};
} catch (error: any) {
  console.log("error",error)
  return {status:error.response.status,data:error.response.data};
}
}
export async function logout_admin() {
  let {path} = ApiClient.authAdmin.logout();
  const response = await api.post(path);
  return {status:response.status,data:response.data};
}
export async function refresh_tokenAdmin() {
let {path} = ApiClient.authAdmin.refresh_token();
const response = await api.post(path);
return {status:response.status,data:response.data};
}

export async function resetPasswordAdmin(data: { token: string, password: string }) {
let {path} = ApiClient.authAdmin.resetPassword(data);
const response = await api.post(path,data);
return {status:response.status,data:response.data};
}
export async function forgotPasswordAdmin(data: { email: string }) {
let {path} = ApiClient.authAdmin.forgotPassword(data);
const response = await api.post(path,data);
return {status:response.status,data:response.data};
}
//!! AuthAdmin Api's End

//?? Admins Api's Start
export async function getAllAdmins(params?:PaginationInterface ): Promise<PaginatedResponse<Admin>> {
  let { path } = ApiClient.admins.getAll();
  const response = await api.get(path+`?${new URLSearchParams(params as any).toString()}`);
  return response.data;
}
export async function getAdminById(id:string) {
  let { path } = ApiClient.admins.getById(id);
  const response = await api.get(path);
  return {status:response.status,data:response.data};
}
export async function createAdmin(data:Partial<Admin>) {
  let { path } = ApiClient.admins.create(data);
  const response = await api.post(path,data);
  return {status:response.status,data:response.data};
}
export async function updateAdmin(id:string,data:Partial<Admin>) {
  let { path } = ApiClient.admins.update(id,data);
  const response = await api.put(path,data);
  return {status:response.status,data:response.data};
}
export async function deleteAdmin(id:string) {
  let { path } = ApiClient.admins.delete(id);
  const response = await api.delete(path);
  return {status:response.status,data:response.data};
}
export async function getAdminProfile(id:string) {
  let { path } = ApiClient.admins.getAdminProfile(id);
  const response = await api.get(path);
  return {status:response.status,data:response.data};
}
export async function getAdminNotifications(id:string) {
  let { path } = ApiClient.admins.getAdminNotifications(id);
  const response = await api.get(path);
  return {status:response.status,data:response.data};
}
//!! Admins Api's End

//?? Monitor Api's Start
export async function getDashboardOverview(userId:string) {
  let { path } = ApiClient.monitor.getDashboardOverview(userId);
  const response = await api.get(path);
  return {status:response.status,data:response.data};
}
export async function getDashboardMetrics(userId:string) {
  let { path } = ApiClient.monitor.getDashboardMetrics(userId);
  const response = await api.get(path);
  return {status:response.status,data:response.data};
}
//!! Monitor Api's End