'use client';

import React from 'react';
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'text' | 'white';
  color?: "primary" | "secondary";
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: React.CSSProperties;
}

const getVariantClasses = (variant: ButtonProps['variant'],color="primary") => {
  switch (variant) {
    case 'primary':
      return color === 'primary' ? 'bg-primary-main hover:bg-primary-main text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95' : 'bg-secondary-main hover:bg-secondary-main text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';
    case 'secondary':
      return color === 'secondary' ? 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95' : 'bg-secondary-main hover:bg-secondary-main text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';
    case 'outline':
      return color === 'secondary' ? 'border-2 border-secondary-main text-secondary-main hover:bg-secondary-main btn-outline transform hover:scale-105 active:scale-95' : 'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white btn-outline transform hover:scale-105 active:scale-95';
    case 'ghost':
      return color === 'secondary' ? 'text-secondary-main hover:text-secondary-dark transform hover:scale-105 active:scale-95' : 'text-primary-main hover:text-primary-dark transform hover:scale-105 active:scale-95';
    case 'danger':
      return color === 'secondary' ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95' : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';
    case 'text':
      return color === 'secondary' ? 'text-gray-700 hover:bg-gray-100 transform hover:scale-105 active:scale-95' : 'text-primary-main hover:bg-primary-dark transform hover:scale-105 active:scale-95';
    case 'white':
      return color === 'secondary' ? 'bg-white text-secondary-main hover:bg-gray-100 hover:text-secondary-main' : 'bg-white text-primary-main hover:bg-gray-100 hover:text-primary-main';
    default:
      return '  shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';
  }
};

const getSizeClasses = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  style,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
  color = 'primary'
}) => {
  const baseClasses = `inline-flex items-center justify-center font-medium transition-all gap-2 duration-200 ${variant === 'text' ? 'text-gray-700 hover:bg-gray-100 transform hover:scale-105 active:scale-95 rounded-full py-1' : 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main rounded-lg'}`
  const variantClasses = getVariantClasses(variant,color);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'cursor-not-allowed opacity-60 transform-none' : 'cursor-pointer';

  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2 animate-spin" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClass} ${className}`}
    >
      {content}
    </button>
  );
}; 