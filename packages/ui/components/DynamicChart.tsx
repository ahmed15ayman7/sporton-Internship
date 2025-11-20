'use client';

import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BubbleController,
  DoughnutController,
  PieController,
  PolarAreaController,
  RadarController,
} from 'chart.js';
import {
  Chart,
  Bar,
  Line,
  Bubble,
  Doughnut,
  Pie,
  PolarArea,
  Radar,
} from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  CalendarDays,
} from 'lucide-react';

// تسجيل جميع مكونات Chart.js المطلوبة
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BubbleController,
  DoughnutController,
  PieController,
  PolarAreaController,
  RadarController
);

// أنواع الشارت المدعومة
export type ChartType =
  | 'bar'
  | 'stackedBar'
  | 'line'
  | 'multiAxisLine'
  | 'bubble'
  | 'combo'
  | 'doughnut'
  | 'multiPie'
  | 'pie'
  | 'polarArea'
  | 'polarAreaCentered'
  | 'radar'
  | 'radarSkip'
  | 'progressiveLine'
  | 'progressiveLineEasing'
  | 'delay'
  | 'drop'
  | 'loop'
  | 'linearGradient'
  | 'radialGradient';

// أنواع الفترات الزمنية
export type TimePeriod = 'year' | 'month' | 'day';

// واجهة Props للمكون
export interface DynamicChartProps {
  chartType: ChartType;
  data?: any;
  options?: any;
  className?: string;
  height?: number;
  width?: number;
}

// بيانات تجريبية لكل نوع شارت
const getSampleData = (chartType: ChartType, timePeriod: TimePeriod) => {
  const baseData = {
    year: ['2020', '2021', '2022', '2023', '2024'],
    month: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    day: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
  };

  const labels = baseData[timePeriod];

  switch (chartType) {
    case 'bar':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#623ACF',
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      };

    case 'stackedBar':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#623ACF',
            stack: 'Stack 0',
          },
          {
            label: 'الإيرادات',
            data: [45, 79, 50, 41, 16, 85, 20],
            backgroundColor: '#F7911C',
            stack: 'Stack 0',
          },
        ],
      };

    case 'line':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#623ACF',
            backgroundColor: 'rgba(98, 58, 207, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      };

    case 'multiAxisLine':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#623ACF',
            backgroundColor: 'rgba(98, 58, 207, 0.1)',
            yAxisID: 'y',
          },
          {
            label: 'الإيرادات',
            data: [45, 79, 50, 41, 16, 85, 20],
            borderColor: '#F7911C',
            backgroundColor: 'rgba(247, 145, 28, 0.1)',
            yAxisID: 'y1',
          },
        ],
      };

    case 'bubble':
      return {
        datasets: [
          {
            label: 'المنتج أ',
            data: [
              { x: 20, y: 30, r: 15 },
              { x: 40, y: 10, r: 10 },
              { x: 60, y: 50, r: 20 },
              { x: 80, y: 20, r: 12 },
            ],
            backgroundColor: '#623ACF',
          },
        ],
      };

    case 'combo':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#623ACF',
            type: 'bar',
          },
          {
            label: 'الإيرادات',
            data: [45, 79, 50, 41, 16, 85, 20],
            borderColor: '#F7911C',
            type: 'line',
            fill: false,
          },
        ],
      };

    case 'doughnut':
      return {
        labels: ['المبيعات', 'الإيرادات', 'المصروفات', 'الأرباح'],
        datasets: [
          {
            data: [300, 200, 100, 150],
            backgroundColor: [
              '#623ACF',
              '#F7911C',
              '#10B981',
              '#EF4444',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };

    case 'multiPie':
      return {
        labels: ['المبيعات', 'الإيرادات', 'المصروفات', 'الأرباح'],
        datasets: [
          {
            data: [300, 200, 100, 150],
            backgroundColor: [
              '#623ACF',
              '#F7911C',
              '#10B981',
              '#EF4444',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };

    case 'pie':
      return {
        labels: ['المبيعات', 'الإيرادات', 'المصروفات', 'الأرباح'],
        datasets: [
          {
            data: [300, 200, 100, 150],
            backgroundColor: [
              '#623ACF',
              '#F7911C',
              '#10B981',
              '#EF4444',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };

    case 'polarArea':
      return {
        labels: ['المبيعات', 'الإيرادات', 'المصروفات', 'الأرباح', 'الاستثمارات'],
        datasets: [
          {
            data: [300, 200, 100, 150, 250],
            backgroundColor: [
              'rgba(98, 58, 207, 0.8)',
              'rgba(247, 145, 28, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(59, 130, 246, 0.8)',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };

    case 'polarAreaCentered':
      return {
        labels: ['المبيعات', 'الإيرادات', 'المصروفات', 'الأرباح', 'الاستثمارات'],
        datasets: [
          {
            data: [300, 200, 100, 150, 250],
            backgroundColor: [
              'rgba(98, 58, 207, 0.8)',
              'rgba(247, 145, 28, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(59, 130, 246, 0.8)',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };

    case 'radar':
      return {
        labels: ['المبيعات', 'التسويق', 'التطوير', 'الدعم', 'الموارد البشرية'],
        datasets: [
          {
            label: 'الأداء الحالي',
            data: [65, 59, 90, 81, 56],
            fill: true,
            backgroundColor: 'rgba(98, 58, 207, 0.2)',
            borderColor: '#623ACF',
            pointBackgroundColor: '#623ACF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#623ACF',
          },
        ],
      };

    case 'radarSkip':
      return {
        labels: ['المبيعات', 'التسويق', 'التطوير', 'الدعم', 'الموارد البشرية'],
        datasets: [
          {
            label: 'الأداء الحالي',
            data: [65, 59, 90, 81, 56],
            fill: true,
            backgroundColor: 'rgba(98, 58, 207, 0.2)',
            borderColor: '#623ACF',
            pointBackgroundColor: '#623ACF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#623ACF',
            spanGaps: true,
          },
        ],
      };

    case 'progressiveLine':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات التدريجية',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#623ACF',
            backgroundColor: 'rgba(98, 58, 207, 0.1)',
            tension: 0.4,
            fill: true,
            animation: {
              duration: 2000,
              easing: 'linear',
            },
          },
        ],
      };

    case 'progressiveLineEasing':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات مع التسهيل',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#623ACF',
            backgroundColor: 'rgba(98, 58, 207, 0.1)',
            tension: 0.4,
            fill: true,
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart',
            },
          },
        ],
      };

    case 'delay':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات مع تأخير',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#623ACF',
            borderRadius: 8,
            animation: {
              delay: (context: any) => context.dataIndex * 100,
            },
          },
        ],
      };

    case 'drop':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات مع تأثير السقوط',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#623ACF',
            borderRadius: 8,
            animation: {
              duration: 1000,
              easing: 'easeOutBounce',
            },
          },
        ],
      };

    case 'loop':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات المتكررة',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#623ACF',
            backgroundColor: 'rgba(98, 58, 207, 0.1)',
            tension: 0.4,
            fill: true,
            animation: {
              duration: 2000,
              loop: true,
            },
          },
        ],
      };

    case 'linearGradient':
      return {
        labels,
        datasets: [
          {
            label: 'المبيعات مع التدرج الخطي',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                return null;
              }
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'rgba(98, 58, 207, 0)');
              gradient.addColorStop(1, 'rgba(98, 58, 207, 0.8)');
              return gradient;
            },
            borderColor: '#623ACF',
            tension: 0.4,
            fill: true,
          },
        ],
      };

    case 'radialGradient':
      return {
        labels: ['المبيعات', 'الإيرادات', 'المصروفات', 'الأرباح'],
        datasets: [
          {
            data: [300, 200, 100, 150],
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                return null;
              }
              const centerX = (chartArea.left + chartArea.right) / 2;
              const centerY = (chartArea.top + chartArea.bottom) / 2;
              const radius = Math.min(chartArea.width, chartArea.height) / 2;
              const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
              gradient.addColorStop(0, 'rgba(98, 58, 207, 0.8)');
              gradient.addColorStop(1, 'rgba(98, 58, 207, 0.2)');
              return gradient;
            },
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };

    default:
      return {
        labels,
        datasets: [
          {
            label: 'البيانات',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#623ACF',
          },
        ],
      };
  }
};

// الحصول على الإعدادات المناسبة لكل نوع شارت
const getChartOptions = (chartType: ChartType, timePeriod: TimePeriod) => {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Cairo, sans-serif',
          },
        },
      },
      title: {
        display: true,
        text: `نوع الشارت: ${chartType} - الفترة: ${timePeriod}`,
        font: {
          family: 'Cairo, sans-serif',
          size: 16,
        },
      },
    },
  };

  switch (chartType) {
    case 'multiAxisLine':
      return {
        ...baseOptions,
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };

    case 'bubble':
      return {
        ...baseOptions,
        scales: {
          x: {
            type: 'linear' as const,
            position: 'bottom' as const,
          },
          y: {
            type: 'linear' as const,
            position: 'left' as const,
          },
        },
      };

    case 'radar':
    case 'radarSkip':
      return {
        ...baseOptions,
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              font: {
                family: 'Cairo, sans-serif',
              },
            },
          },
        },
      };

    default:
      return baseOptions;
  }
};

// الحصول على الأيقونة المناسبة لكل نوع شارت
const getChartIcon = (chartType: ChartType) => {
  switch (chartType) {
    case 'bar':
    case 'stackedBar':
    case 'delay':
    case 'drop':
      return <BarChart3 className="w-5 h-5" />;
    case 'line':
    case 'multiAxisLine':
    case 'progressiveLine':
    case 'progressiveLineEasing':
    case 'loop':
    case 'linearGradient':
      return <LineChart className="w-5 h-5" />;
    case 'bubble':
      return <Activity className="w-5 h-5" />;
    case 'combo':
      return <TrendingUp className="w-5 h-5" />;
    case 'doughnut':
    case 'multiPie':
    case 'pie':
    case 'radialGradient':
      return <PieChart className="w-5 h-5" />;
    case 'polarArea':
    case 'polarAreaCentered':
      return <Target className="w-5 h-5" />;
    case 'radar':
    case 'radarSkip':
      return <Activity className="w-5 h-5" />;
    default:
      return <BarChart3 className="w-5 h-5" />;
  }
};

// مكون Radio Button للفترة الزمنية
const TimePeriodSelector: React.FC<{
  value: TimePeriod;
  onChange: (period: TimePeriod) => void;
}> = ({ value, onChange }) => {
  const periods = [
    { value: 'year' as TimePeriod, label: 'سنة', icon: Calendar },
    { value: 'month' as TimePeriod, label: 'شهر', icon: CalendarDays },
    { value: 'day' as TimePeriod, label: 'يوم', icon: Clock },
  ];

  return (
    <div className="flex items-center space-x-4 space-x-reverse mb-6 p-4 bg-white rounded-lg shadow-sm border">
      <span className="text-sm font-medium text-gray-700">الفترة الزمنية:</span>
      <div className="flex items-center space-x-3 space-x-reverse">
        {periods.map((period) => {
          const Icon = period.icon;
          return (
            <label
              key={period.value}
              className="flex items-center space-x-2 space-x-reverse cursor-pointer"
            >
              <input
                type="radio"
                name="timePeriod"
                value={period.value}
                checked={value === period.value}
                onChange={(e) => onChange(e.target.value as TimePeriod)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
              />
              <Icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{period.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// المكون الرئيسي
export const DynamicChart: React.FC<DynamicChartProps> = ({
  chartType,
  data: externalData,
  options: externalOptions,
  className = '',
  height = 400,
  width,
}) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

  // استخدام البيانات الخارجية أو البيانات التجريبية
  const chartData = useMemo(() => {
    return externalData || getSampleData(chartType, timePeriod);
  }, [externalData, chartType, timePeriod]);

  // دمج الإعدادات الخارجية مع الإعدادات الافتراضية
  const chartOptions = useMemo(() => {
    const defaultOptions = getChartOptions(chartType, timePeriod);
    return externalOptions ? { ...defaultOptions, ...externalOptions } : defaultOptions;
  }, [externalOptions, chartType, timePeriod]);

  // تحديد مكون الشارت المناسب
  const renderChart = () => {
    const commonProps = {
      data: chartData,
      options: chartOptions,
      height,
      width,
    };

    switch (chartType) {
      case 'bar':
      case 'stackedBar':
      case 'delay':
      case 'drop':
        return <Bar {...commonProps} />;
      case 'line':
      case 'multiAxisLine':
      case 'progressiveLine':
      case 'progressiveLineEasing':
      case 'loop':
      case 'linearGradient':
        return <Line {...commonProps} />;
      case 'bubble':
        return <Bubble {...commonProps} />;
      case 'combo':
        return <Chart {...commonProps} type="bar" />;
      case 'doughnut':
        return <Doughnut {...commonProps} />;
      case 'multiPie':
      case 'pie':
      case 'radialGradient':
        return <Pie {...commonProps} />;
      case 'polarArea':
      case 'polarAreaCentered':
        return <PolarArea {...commonProps} />;
      case 'radar':
      case 'radarSkip':
        return <Radar {...commonProps} />;
      default:
        return <Bar {...commonProps} />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* عنوان الشارت مع الأيقونة */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-2 space-x-reverse mb-4"
      >
        {getChartIcon(chartType)}
        <h3 className="text-lg font-semibold text-gray-800">
          {chartType}
        </h3>
      </motion.div>

      {/* محدد الفترة الزمنية */}
      <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />

      {/* منطقة الشارت */}
      <motion.div
        key={`${chartType}-${timePeriod}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white rounded-lg shadow-lg border p-6"
        style={{ height: `${height}px` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${chartType}-${timePeriod}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderChart()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DynamicChart;
