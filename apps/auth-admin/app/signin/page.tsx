"use client"
import React, { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";

import { AuthForm } from "@/components/AuthForm";
import { useAuthAdmin } from "@sporton/auth-admin";
import useLanguageStore from "../../store/useLanguageStore";
import { motion } from "framer-motion";
import Image from "next/image";


const LoginPage: React.FC = () => {
  let {admin,isLoading} = useAuthAdmin();
  const {locale} = useLanguageStore();
  useEffect(() => {
    // إذا كان المستخدم مسجل الدخول بالفعل، قم بتحويله
    if (admin && !isLoading) {
      if (admin) {
          window.location.href = '/mo';
      }
    }
  }, [admin, isLoading]);
  if(isLoading){
    return (
    <div className="h-screen  flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Image src={`/auth-admin/images/loader2.gif`} alt="Logo" className='rounded-full' width={200} height={200} />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-secondary-main mb-2"
      >
        SPORTON
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-secondary-main/80"
      >
        {locale === 'en' ? 'Loading...' : 'جاري التحميل...'}
        </motion.p>
    </motion.div>
    </div>
    );
  }
  return (
    <AuthLayout backgroundImage="/auth-admin/images/backgroundSignin.svg">
      <AuthForm type="signin" />
      </AuthLayout>
    );
  };

  export default LoginPage;

















// <h2 className="text-2xl font-bold text-center mb-2">Log In</h2>
// <p className="text-center text-gray-400 text-sm mb-5">
//   Already have an account?{" "}
//   <a href="#" className="text-secondary-main font-medium">
//     Log in
//   </a>
// </p>
// <div className="flex flex-col gap-3 mb-4">
//   <button className="flex items-center gap-2 border rounded-full py-2 px-4 justify-center hover:bg-gray-50 ">
//     <Icon icon="logos:facebook" width="22" height="22" />
//     Continue with Facebook
//   </button>
//   <button className="flex items-center gap-2 border rounded-full py-2 px-4 justify-center hover:bg-gray-50 ">
//     <Icon icon="devicon:google" width="22" height="22" />
//     Continue with Google
//   </button>
// </div>
// <div className="flex items-center gap-3 text-gray-400 mb-5">
//   <div className="flex-1 border-t"></div> OR <div className="flex-1 border-t"></div>
// </div>
// <form className="flex flex-col gap-3">
//   <label className="text-gray-600 text-sm">Your email</label>
//   <input
//     type="email"
//     className="border rounded-md px-3 py-2 focus:ring-primary-main focus:outline-none"
//     autoComplete="email"
//   />
//   <label className="text-gray-600 text-sm flex items-center justify-between">
//     Password
//     <span
//       onClick={() => setShowPassword((v) => !v)}
//       className="flex items-center gap-1 text-secondary-main cursor-pointer"
//     >
//       <Icon
//         icon={showPassword ? "ic:sharp-visibility" : "ic:sharp-visibility-off"}
//         width="18"
//       />
//       {showPassword ? "Show" : "Hide"}
//     </span>
//   </label>
//   <input
//     type={showPassword ? "text" : "password"}
//     className="border rounded-md px-3 py-2 focus:ring-primary-main focus:outline-none"
//     autoComplete="current-password"
//   />
//   <div className="flex justify-between items-center mt-1">
//     <label className="flex items-center gap-2 text-sm">
//       <input type="checkbox" className="form-checkbox" />
//       Remember me
//     </label>
//     <a className="text-xs text-secondary-main" href="#">
//       Forgot Password
//     </a>
//   </div>
//   <button
//     type="submit"
//     className="bg-primary-light text-primary-dark rounded-full py-3 mt-3 text-lg font-semibold transition active:bg-primary-main active:text-white"
//   >
//     Log In
//   </button>
// </form>
// <p className="text-center text-gray-400 text-sm mt-6">
//   Already have an account?{" "}
//   <a className="text-secondary-main" href="#">
//     Register
//   </a>
// </p>