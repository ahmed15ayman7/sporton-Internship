"use client";
import { Button, Input } from "@sporton/ui";
import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-black">
        <h1 className="text-xl font-bold mb-8 text-center">Login</h1>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="my-2" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="my-4" />
        <Button onClick={() => alert(`Logging in as ${email}`)} className="w-full">Sign In</Button>
      </div>
    </div>
  );
}