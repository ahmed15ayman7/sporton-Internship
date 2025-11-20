import { Sport } from '@sporton/interfaces';
export const sports: { key: Sport; en: string; ar: string }[] = [
    { key: 'FOOTBALL', en: 'Football', ar: 'كرة القدم' },
    { key: 'RUNNING', en: 'Running', ar: 'الجري' },
    { key: 'TENNIS', en: 'Tennis', ar: 'التنس' },
    { key: 'BASKETBALL', en: 'Basketball', ar: 'كرة السلة' },
    { key: 'SWIMMING', en: 'Swimming', ar: 'السباحة' },
    { key: 'KARATE', en: 'Karate', ar: 'الكاراتيه' },
    { key: 'DIVING', en: 'Diving', ar: 'الغوص' },
    { key: 'FITNESS', en: 'Fitness', ar: 'اللياقة البدنية' },
    { key: 'HORSE_RIDING', en: 'Horse Riding', ar: 'ركوب الخيل' },
    { key: 'CYCLING', en: 'Cycling', ar: 'ركوب الدراجات' },
    { key: 'SKATING', en: 'Skating', ar: 'التزلج' },
    { key: 'HANDBALL', en: 'Handball', ar: 'كرة اليد' },
    { key: 'GOLF', en: 'Golf', ar: 'الجولف' },
    { key: 'HOCKEY', en: 'Hockey', ar: 'الهوكي' },
    { key: 'CHESS', en: 'Chess', ar: 'الشطرنج' },
    { key: 'KUNG_FU', en: 'Kung Fu', ar: 'الكونغ فو' },
    { key: 'BOXING', en: 'Boxing', ar: 'الملاكمة' },
    { key: 'BOWLING', en: 'Bowling', ar: 'البولينج' },
    { key: 'VOLLEYBALL', en: 'Volleyball', ar: 'كرة الطائرة' },
    { key: 'LONG_JUMP', en: 'Long Jump', ar: 'الوثب الطويل' },
];
export const positions: {
    key: string;
    options: { key: string; en: string; ar: string }[];
  }[] = [
    {
      key: 'FOOTBALL',
      options: [
        { key: 'GK', en: 'Goalkeeper', ar: 'حارس مرمى' },
        { key: 'RB', en: 'Right Back', ar: 'ظهير أيمن' },
        { key: 'LB', en: 'Left Back', ar: 'ظهير أيسر' },
        { key: 'CB', en: 'Center Back', ar: 'قلب دفاع' },
        { key: 'CDM', en: 'Defensive Midfielder', ar: 'وسط مدافع' },
        { key: 'CM', en: 'Central Midfielder', ar: 'وسط ميدان' },
        { key: 'CAM', en: 'Attacking Midfielder', ar: 'وسط هجومي' },
        { key: 'RW', en: 'Right Winger', ar: 'جناح أيمن' },
        { key: 'LW', en: 'Left Winger', ar: 'جناح أيسر' },
        { key: 'ST', en: 'Striker', ar: 'مهاجم' }
      ]
    },
    {
      key: 'BASKETBALL',
      options: [
        { key: 'PG', en: 'Point Guard', ar: 'صانع ألعاب' },
        { key: 'SG', en: 'Shooting Guard', ar: 'مدافع مسدد' },
        { key: 'SF', en: 'Small Forward', ar: 'جناح صغير' },
        { key: 'PF', en: 'Power Forward', ar: 'جناح قوي' },
        { key: 'C', en: 'Center', ar: 'محور' }
      ]
    },
    {
      key: 'VOLLEYBALL',
      options: [
        { key: 'OH', en: 'Outside Hitter', ar: 'ضارب خارجي' },
        { key: 'OPP', en: 'Opposite Hitter', ar: 'ضارب معاكس' },
        { key: 'S', en: 'Setter', ar: 'موزع' },
        { key: 'MB', en: 'Middle Blocker', ar: 'حائط صد وسط' },
        { key: 'L', en: 'Libero', ar: 'ليبرو' }
      ]
    },
    {
      key: 'HANDBALL',
      options: [
        { key: 'GK', en: 'Goalkeeper', ar: 'حارس مرمى' },
        { key: 'LW', en: 'Left Wing', ar: 'جناح أيسر' },
        { key: 'RW', en: 'Right Wing', ar: 'جناح أيمن' },
        { key: 'LB', en: 'Left Back', ar: 'ظهير أيسر' },
        { key: 'RB', en: 'Right Back', ar: 'ظهير أيمن' },
        { key: 'CB', en: 'Center Back', ar: 'صانع ألعاب' },
        { key: 'P', en: 'Pivot', ar: 'محور' }
      ]
    }
  ];
  export const countries = [
    { key: 'SA', en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    { key: 'AE', en: 'United Arab Emirates', ar: 'الإمارة العربية المتحدة' },
    { key: 'EG', en: 'Egypt', ar: 'مصر' },
    { key: 'QA', en: 'Qatar', ar: 'قطر' },
    { key: 'TN', en: 'Tonesia', ar: 'تونس' },
    { key: 'MA', en: 'Morocco', ar: 'المغرب' },
    { key: 'DZ', en: 'Algeria', ar: 'الجزائر' },
    { key: 'LY', en: 'Libya', ar: 'ليبيا' },
    { key: 'JO', en: 'Jordan', ar: 'الأردن' },
    { key: 'LB', en: 'Lebanon', ar: 'لبنان' },
    { key: 'SY', en: 'Syria', ar: 'سوريا' },
    { key: 'SD', en: 'Sudan', ar: 'السودان' },
    { key: 'SO', en: 'Somalia', ar: 'الصومال' },
    { key: 'ET', en: 'Ethiopia', ar: 'إثيوبيا' },
    { key: 'KW', en: 'Kuwait', ar: 'الكويت' },
    { key: 'US', en: 'United States', ar: 'الولايات المتحدة' },
    { key: 'UK', en: 'United Kingdom', ar: 'المملكة المتحدة' },
    { key: 'FR', en: 'France', ar: 'فرنسا' },
    { key: 'DE', en: 'Germany', ar: 'ألمانيا' },
    { key: 'IT', en: 'Italy', ar: 'إيطاليا' },
    { key: 'ES', en: 'Spain', ar: 'إسبانيا' },
    { key: 'NL', en: 'Netherlands', ar: 'هولندا' },
    { key: 'BE', en: 'Belgium', ar: 'بلجيكا' },
    { key: 'SE', en: 'Sweden', ar: 'السويد' },
    { key: 'NO', en: 'Norway', ar: 'النرويج' },
    { key: 'DK', en: 'Denmark', ar: 'الدانمارك' },
    { key: 'FI', en: 'Finland', ar: 'فنلندا' },
    { key: 'IS', en: 'Iceland', ar: 'آيسلندا' },
    { key: 'CA', en: 'Canada', ar: 'كندا' },
    { key: 'AU', en: 'Australia', ar: 'أستراليا' },
    { key: 'NZ', en: 'New Zealand', ar: 'نيوزيلاندا' },
    { key: 'ZA', en: 'South Africa', ar: 'جنوب أفريقيا' },
    { key: 'AR', en: 'Argentina', ar: 'الأرجنتين' },
    { key: 'BR', en: 'Brazil', ar: 'البرازيل' },
    { key: 'MX', en: 'Mexico', ar: 'المكسيك' },
    { key: 'CO', en: 'Colombia', ar: 'كولومبيا' },
    { key: 'PE', en: 'Peru', ar: 'البيرو' },
    { key: 'CL', en: 'Chile', ar: 'شيلي' },
    { key: 'PY', en: 'Paraguay', ar: 'باراغواي' },
    { key: 'UY', en: 'Uruguay', ar: 'أوروغواي' },
    { key: 'VE', en: 'Venezuela', ar: 'فنزويلا' },
    { key: 'EC', en: 'Ecuador', ar: 'إكوادور' },
    { key: 'BO', en: 'Bolivia', ar: 'بوليفيا' },
    { key: 'PA', en: 'Panama', ar: 'بنما' },
    { key: 'CR', en: 'Costa Rica', ar: 'كوستاريكا' },
    { key: 'NI', en: 'Nicaragua', ar: 'نيكاراغوا' },
    { key: 'HN', en: 'Honduras', ar: 'هندوراس' },
    { key: 'SV', en: 'El Salvador', ar: 'السلفادور' },
    { key: 'GT', en: 'Guatemala', ar: 'غواتيمالا' },
    { key: 'BZ', en: 'Belize', ar: 'بليز' },
    { key: 'JM', en: 'Jamaica', ar: 'جامايكا' },
    { key: 'CU', en: 'Cuba', ar: 'كوبا' },
    { key: 'HT', en: 'Haiti', ar: 'هايتي' },
    { key: 'DO', en: 'Dominican Republic', ar: 'الدومينيكان' },
    { key: 'PR', en: 'Puerto Rico', ar: 'بورتوريكو' },
    { key: 'VI', en: 'Virgin Islands', ar: 'الجزر العذرية' },
    { key: 'MH', en: 'Marshall Islands', ar: 'جزر مارشال' },
    { key: 'FM', en: 'Micronesia', ar: 'ميكرونيزيا' },
    { key: 'PW', en: 'Palau', ar: 'بالاو' },
    { key: 'VA', en: 'Vatican City', ar: 'الدولة الفاتيكانية' },
    { key: 'SM', en: 'San Marino', ar: 'سان مارينو' },
    { key: 'VA', en: 'Vatican City', ar: 'الدولة الفاتيكانية' },
]
  export const checkProfane = async (text: string,setIsProfane: (isProfane: boolean) => void,setProfanityMessage: (profanityMessage: string) => void,aiApi: any,toast: any,XMarkIcon: any) => {
    try {
  
      let arResponse = await aiApi.arSpamModel(text || '');
      let enResponse = await aiApi.enSpamModel(text || '');
  
      let arResult = false;
      let enResult = false;
  
      if (arResponse.status === 200) {
        arResult = arResponse.data?.final_prediction==="Bad";
      }
      if (enResponse.status === 200) {
        enResult = enResponse.data?.final_prediction==="Bad"||false;
      }
  
      if (arResult || enResult) {
        setIsProfane(true);
        // setProfanityMessage("⚠️ يحتوي النص على ألفاظ غير لائقة، يرجى التعديل قبل النشر");
        toast(<div className="flex items-center gap-2">
          <XMarkIcon className="w-4 h-4 text-red-500" />
          <p className="text-sm">الكلام يحتوي على ألفاظ بذيئة</p>
        </div>);
        return false;
      } else {
        setIsProfane(false);
        setProfanityMessage('');
        return true;
      }
    } catch (error) {
      console.error("Error checking profanity:", error);
      return false;
    }
  }