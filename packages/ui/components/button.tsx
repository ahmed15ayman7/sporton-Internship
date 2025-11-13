import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-primary-main hover:bg-primary-dark text-white px-4 py-3 font-bold text-lg rounded-full cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
