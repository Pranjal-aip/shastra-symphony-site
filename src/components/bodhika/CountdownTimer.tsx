import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
const translations = {
  days: {
    en: 'Days',
    hi: 'दिन',
    sa: 'दिनानि'
  },
  hours: {
    en: 'Hours',
    hi: 'घंटे',
    sa: 'होराः'
  },
  minutes: {
    en: 'Minutes',
    hi: 'मिनट',
    sa: 'निमेषाः'
  },
  seconds: {
    en: 'Seconds',
    hi: 'सेकंड',
    sa: 'क्षणाः'
  },
  classesStart: {
    en: 'Classes Start In',
    hi: 'कक्षाएं शुरू होंगी',
    sa: 'कक्षाः आरभ्यन्ते'
  },
  enrollBefore: {
    en: 'Enroll before classes begin!',
    hi: 'कक्षाएं शुरू होने से पहले नामांकन करें!',
    sa: 'कक्षाः प्रारम्भात् पूर्वं नामाङ्कयत!'
  }
};
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const CountdownTimer = () => {
  const {
    language
  } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;
  const targetDate = new Date('2026-03-07T00:00:00');
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(difference / (1000 * 60 * 60) % 24),
      minutes: Math.floor(difference / 1000 / 60 % 60),
      seconds: Math.floor(difference / 1000 % 60)
    };
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const TimeUnit = ({
    value,
    label
  }: {
    value: number;
    label: string;
  }) => <div className="flex flex-col items-center">
      <motion.div key={value} initial={{
      scale: 1.1,
      opacity: 0.8
    }} animate={{
      scale: 1,
      opacity: 1
    }} className="bg-gradient-to-br from-maroon to-maroon-dark text-white font-heading text-xl sm:text-2xl md:text-3xl font-bold w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-lg flex items-center justify-center shadow-lg">
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="font-body text-muted-foreground text-[10px] sm:text-xs mt-1">{label}</span>
    </div>;
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-body text-xs sm:text-sm font-medium">{t(translations.classesStart)}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <TimeUnit value={timeLeft.days} label={t(translations.days)} />
        <span className="font-heading text-xl sm:text-2xl text-maroon font-bold">:</span>
        <TimeUnit value={timeLeft.hours} label={t(translations.hours)} />
        <span className="font-heading text-xl sm:text-2xl text-maroon font-bold">:</span>
        <TimeUnit value={timeLeft.minutes} label={t(translations.minutes)} />
        <span className="font-heading text-xl sm:text-2xl text-maroon font-bold">:</span>
        <TimeUnit value={timeLeft.seconds} label={t(translations.seconds)} />
      </div>
      <p className="font-body text-xs sm:text-sm text-saffron font-medium">{t(translations.enrollBefore)}</p>
    </div>
  );
};
export default CountdownTimer;