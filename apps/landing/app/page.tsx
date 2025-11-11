'use client';
import { useState } from 'react';
import { Button, Input } from "@sporton/ui";
export default function LandingPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-black">
        <h1 className="text-xl font-bold mb-5 text-center">Contact Us</h1>
        <Input placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <div className="my-4" />
        <Button onClick={() => alert(`Message sent: ${message}`)} className='block ml-auto'>Send</Button>
      </div>
    </div>
  );
}
