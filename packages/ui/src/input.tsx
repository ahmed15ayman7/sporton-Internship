import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={`border border-gray-300 p-2 rounded-lg w-full ${className}`}
      {...props}
    />
  );
};

