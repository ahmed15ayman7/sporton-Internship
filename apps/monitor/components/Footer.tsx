'use client';

import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="bg-white border-t border-gray-200 px-6 py-4 text-center"
    >
      <p className="text-sm text-gray-600">
        © 2024 SPORTON Monitor Dashboard. All rights reserved.
      </p>
    </motion.footer>
  );
};
