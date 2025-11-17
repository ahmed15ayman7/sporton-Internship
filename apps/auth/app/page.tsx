"use client";
import { Button } from "@sporton/ui/components/button";
import { Input } from "@sporton/ui/components/input";

import { useState } from 'react';
import api, { ApiClient, authApi } from "@sporton/apis";

interface validationErrors {
  email: string;
  password: string;
}

export default function AuthPage() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<validationErrors>({ email: '', password: '' });


  let login = async () => {
    setEmail(email.trim());
    setPassword(password.trim());
    let hasError = false;
    if (!email || emailRegex.test(email) === false) {
      setError((prev) => ({ ...prev, email: 'يرجى إدخال بريد إلكتروني صالح.' }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, email: '' }));
    }
    if (!password || password.length < 6) {
      setError((prev) => ({ ...prev, password: 'يرجى إدخال كلمة مرور صحيحة.' }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, password: '' }));
    }
    if (hasError) {
      return;
    }
    // let response = await authApi.login({ email, password, rememberMe });
    const {path} = ApiClient.auth.login({ email, password });
    console.log(await api.post(path, { email, password }) );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('https://sporton.club/auth/images/backgroundSignin.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      dir="rtl"
    >
      <div className="absolute inset-0 backdrop-blur-[62px] bg-black/20"></div>
      <div className="bg-white max-w-md rounded-xl shadow-md p-8 z-10 flex-1 space-y-4">
        <h1 className="text-xl font-bold mb-8 text-center">تسجيل الدخول</h1>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="email" className="text-sm">البريد الإلكتروني</label>
          <Input value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="password" className="text-sm">كلمة المرور</label>
          <Input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <input className="rounded-xl" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} id="rememberMe" />
          <label htmlFor="rememberMe" className="text-sm">تذكرني</label>
        </div>
        <div className="my-4" />
        <Button onClick={login} className="w-full">تسجيل الدخول</Button>
      </div>
    </div>
  );
}