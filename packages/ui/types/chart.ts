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

// واجهة البيانات الأساسية للشارت
export interface ChartData {
  labels?: string[];
  datasets: ChartDataset[];
}

// واجهة مجموعة البيانات
export interface ChartDataset {
  label?: string;
  data: number[] | { x: number; y: number; r: number }[];
  backgroundColor?: string | string[] | ((context: any) => string | null);
  borderColor?: string | string[];
  borderWidth?: number;
  borderRadius?: number;
  borderSkipped?: boolean;
  tension?: number;
  fill?: boolean;
  stack?: string;
  type?: 'bar' | 'line';
  yAxisID?: string;
  spanGaps?: boolean;
  animation?: {
    duration?: number;
    easing?: string;
    delay?: number | ((context: any) => number);
    loop?: boolean;
  };
}

// واجهة إعدادات الشارت
export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right';
      labels?: {
        font?: {
          family?: string;
          size?: number;
        };
      };
    };
    title?: {
      display?: boolean;
      text?: string;
      font?: {
        family?: string;
        size?: number;
      };
    };
  };
  scales?: {
    x?: {
      type?: 'linear' | 'category';
      position?: 'top' | 'bottom';
      beginAtZero?: boolean;
    };
    y?: {
      type?: 'linear' | 'category';
      position?: 'left' | 'right';
      beginAtZero?: boolean;
    };
    y1?: {
      type?: 'linear';
      position?: 'right';
      grid?: {
        drawOnChartArea?: boolean;
      };
    };
    r?: {
      beginAtZero?: boolean;
      ticks?: {
        font?: {
          family?: string;
        };
      };
    };
  };
}

// واجهة Props للمكون
export interface DynamicChartProps {
  chartType: ChartType;
  data?: ChartData;
  options?: ChartOptions;
  className?: string;
  height?: number;
  width?: number;
}

// واجهة بيانات Bubble Chart
export interface BubbleDataPoint {
  x: number;
  y: number;
  r: number;
}

// واجهة إعدادات التحريكات
export interface AnimationConfig {
  duration: number;
  easing?: string;
  delay?: number | ((context: any) => number);
  loop?: boolean;
}

// واجهة إعدادات التدرج
export interface GradientConfig {
  type: 'linear' | 'radial';
  colors: string[];
  positions?: number[];
}

// واجهة إعدادات الشارت المتقدمة
export interface AdvancedChartOptions extends ChartOptions {
  animation?: AnimationConfig;
  gradient?: GradientConfig;
  customColors?: {
    primary?: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
}

// أنواع البيانات للفترات الزمنية المختلفة
export interface TimeBasedData {
  year: string[];
  month: string[];
  day: string[];
}

// واجهة إعدادات مخصصة لكل نوع شارت
export interface ChartTypeConfig {
  type: ChartType;
  icon: string;
  description: string;
  category: 'bar' | 'line' | 'circular' | 'special';
  supportsTimePeriods: boolean;
  supportsAnimations: boolean;
  supportsGradients: boolean;
}

// قائمة بجميع أنواع الشارت مع إعداداتها
export const CHART_TYPE_CONFIGS: ChartTypeConfig[] = [
  {
    type: 'bar',
    icon: 'BarChart3',
    description: 'Bar Chart مع Border Radius',
    category: 'bar',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'stackedBar',
    icon: 'BarChart3',
    description: 'Stacked Bar Chart مع Groups',
    category: 'bar',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'line',
    icon: 'LineChart',
    description: 'Line Chart عادي',
    category: 'line',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'multiAxisLine',
    icon: 'LineChart',
    description: 'Multi Axis Line Chart',
    category: 'line',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'bubble',
    icon: 'Activity',
    description: 'Bubble Chart',
    category: 'special',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'combo',
    icon: 'TrendingUp',
    description: 'Combo bar/line Chart',
    category: 'special',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'doughnut',
    icon: 'PieChart',
    description: 'Doughnut Chart',
    category: 'circular',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'multiPie',
    icon: 'PieChart',
    description: 'Multi Series Pie Chart',
    category: 'circular',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'pie',
    icon: 'PieChart',
    description: 'Pie Chart عادي',
    category: 'circular',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'polarArea',
    icon: 'Target',
    description: 'Polar Area Chart',
    category: 'special',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'polarAreaCentered',
    icon: 'Target',
    description: 'Polar Area مع تسميات مركزية',
    category: 'special',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'radar',
    icon: 'Activity',
    description: 'Radar Chart',
    category: 'special',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'radarSkip',
    icon: 'Activity',
    description: 'Radar Chart مع نقاط متخطية',
    category: 'special',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'progressiveLine',
    icon: 'LineChart',
    description: 'Progressive Line مع تحريكات',
    category: 'line',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'progressiveLineEasing',
    icon: 'LineChart',
    description: 'Progressive Line مع Easing',
    category: 'line',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'delay',
    icon: 'BarChart3',
    description: 'Bar Chart مع تأخير في التحريكات',
    category: 'bar',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'drop',
    icon: 'BarChart3',
    description: 'Bar Chart مع تأثير السقوط',
    category: 'bar',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: false,
  },
  {
    type: 'loop',
    icon: 'LineChart',
    description: 'Line Chart مع تحريكات متكررة',
    category: 'line',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'linearGradient',
    icon: 'LineChart',
    description: 'Line Chart مع تدرج خطي',
    category: 'line',
    supportsTimePeriods: true,
    supportsAnimations: true,
    supportsGradients: true,
  },
  {
    type: 'radialGradient',
    icon: 'PieChart',
    description: 'Pie Chart مع تدرج دائري',
    category: 'circular',
    supportsTimePeriods: false,
    supportsAnimations: true,
    supportsGradients: true,
  },
];

// دالة مساعدة للحصول على إعدادات نوع الشارت
export function getChartTypeConfig(type: ChartType): ChartTypeConfig | undefined {
  return CHART_TYPE_CONFIGS.find(config => config.type === type);
}

// دالة مساعدة للحصول على جميع أنواع الشارت في فئة معينة
export function getChartTypesByCategory(category: ChartTypeConfig['category']): ChartType[] {
  return CHART_TYPE_CONFIGS
    .filter(config => config.category === category)
    .map(config => config.type);
}

// دالة مساعدة للتحقق من دعم الميزات
export function supportsFeature(type: ChartType, feature: 'timePeriods' | 'animations' | 'gradients'): boolean {
  const config = getChartTypeConfig(type);
  if (!config) return false;
  
  switch (feature) {
    case 'timePeriods':
      return config.supportsTimePeriods;
    case 'animations':
      return config.supportsAnimations;
    case 'gradients':
      return config.supportsGradients;
    default:
      return false;
  }
}
