import React from "react";
import { motion } from "framer-motion";

type AuthLayoutProps = {
  children: React.ReactNode;
  backgroundImage: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, backgroundImage }) => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-[62px] bg-black/20" />
      {/* Centered Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10  rounded-2xl  p-8 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;