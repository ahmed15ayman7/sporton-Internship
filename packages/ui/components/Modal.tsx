"use client";
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  styleContainer?: React.CSSProperties;
  padding?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  style,
  className = '',
  styleContainer,
  padding = 'p-6'
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // منع إغلاق الـ modal إذا تم النقر على محتوى الـ modal
      const target = e.target as HTMLElement;
      if (target.closest('.modal-content')) {
        return;
      }
      onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      
      // إضافة class لمنع التفاعل مع الخلفية
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{...style, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto m-0"
      data-modal-overlay="true"
    >
      <div
        style={{...style,...styleContainer}}
        className={`modal-content bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full transition-all duration-300 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between ${padding} border-b border-gray-200`}>
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Content */}
        <div className={padding}>
          {children}
        </div>
      </div>
    </div>
  );
}; 