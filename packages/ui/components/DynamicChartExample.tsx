'use client';

import React, { useState } from 'react';
import { DynamicChart, type ChartType } from './DynamicChart';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// قائمة بجميع أنواع الشارت المدعومة
const chartTypes: ChartType[] = [
  'bar',
  'stackedBar',
  'line',
  'multiAxisLine',
  'bubble',
  'combo',
  'doughnut',
  'multiPie',
  'pie',
  'polarArea',
  'polarAreaCentered',
  'radar',
  'radarSkip',
  'progressiveLine',
  'progressiveLineEasing',
  'delay',
  'drop',
  'loop',
  'linearGradient',
  'radialGradient',
];

export const DynamicChartExample: React.FC = () => {
  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const nextChart = () => {
    setCurrentChartIndex((prev) => (prev + 1) % chartTypes.length);
  };

  const prevChart = () => {
    setCurrentChartIndex((prev) => (prev - 1 + chartTypes.length) % chartTypes.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مكتبة الشارت الديناميكية
          </h1>
          <p className="text-lg text-gray-600">
            مكون React شامل يدعم جميع أنواع الشارت مع تأثيرات انتقالية جميلة
          </p>
        </motion.div>

        {/* أزرار التنقل */}
        <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevChart}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <ChevronRight className="w-5 h-5" />
            <span>السابق</span>
          </motion.button>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">
              {currentChartIndex + 1} من {chartTypes.length}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {chartTypes[currentChartIndex]}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextChart}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span>التالي</span>
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        </div>

        {/* عرض الشارت الحالي */}
        <motion.div
          key={currentChartIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <DynamicChart
            chartType={chartTypes[currentChartIndex]}
            height={500}
            className="w-full"
          />
        </motion.div>

        {/* قائمة سريعة لجميع أنواع الشارت */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            جميع أنواع الشارت المدعومة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {chartTypes.map((chartType, index) => (
              <motion.button
                key={chartType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentChartIndex(index)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentChartIndex === index
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">{chartType}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            مميزات المكون
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                أنواع الشارت المدعومة
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Bar Chart مع Border Radius</li>
                <li>• Stacked Bar Chart مع Groups</li>
                <li>• Line Chart مع Interpolation Modes</li>
                <li>• Multi Axis Line Chart</li>
                <li>• Bubble Chart</li>
                <li>• Combo bar/line Chart</li>
                <li>• Doughnut Chart</li>
                <li>• Multi Series Pie Chart</li>
                <li>• Pie Chart</li>
                <li>• Polar Area Chart</li>
                <li>• Radar Chart</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                التأثيرات والتحريكات
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Animations Progressive Line</li>
                <li>• Progressive Line مع Easing</li>
                <li>• Delay Animations</li>
                <li>• Drop Effects</li>
                <li>• Loop Animations</li>
                <li>• Linear Gradient</li>
                <li>• Radial Gradient</li>
                <li>• Framer Motion Transitions</li>
                <li>• Responsive Design</li>
                <li>• RTL Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicChartExample;
