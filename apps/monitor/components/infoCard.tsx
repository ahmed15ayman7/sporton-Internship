"use client";


import React from 'react';
import { motion } from 'framer-motion';



interface IProps {
  title: string;
  value: string | number;
  icon: string;
  textColor?: string;
  iconColor?: string;
}



const InfoCard = ({ title, value, icon, textColor = "text-gray-900", iconColor = "text-green-600" }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">
            {title}
          </p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
          <span className="text-green-600 text-xl">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default InfoCard;