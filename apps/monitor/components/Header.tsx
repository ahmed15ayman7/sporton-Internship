'use client';

import { motion } from 'framer-motion';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from '@sporton/ui';

export const Header = () => {
  const { admin } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900"
          >
            Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Welcome back, {admin?.name}!
          </motion.p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300  rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all duration-200"
            />
          </motion.div>

          {/* Notifications */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* User Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-primary-main to-secondary-main rounded-full flex items-center justify-center cursor-pointer"
          >
            <Avatar src={admin?.image || '/images/default-avatar.png'} alt={admin?.name || ''} className="text-white font-semibold text-sm" fallback={admin?.name?.charAt(0)} />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
