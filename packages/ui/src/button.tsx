import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
