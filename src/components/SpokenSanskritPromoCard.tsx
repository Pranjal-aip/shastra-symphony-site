import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import sanskritHero from '@/assets/sanskrit-course-hero.jpg';

const tr = {
  title: {
    en: 'Spoken Sanskrit (Sambhashana)',
    hi: 'संभाषण संस्कृत (बोलचाल की संस्कृत)',
    sa: 'सम्भाषणसंस्कृतम्',
  },
  desc: {
    en: 'Start speaking Sanskrit with your family this June. Beginner-friendly, no grammar required.',
    hi: 'इस जून से परिवार सहित संस्कृत बोलना शुरू करें। शुरुआती-अनुकूल, व्याकरण की आवश्यकता नहीं।',
    sa: 'अस्मिन् जून-मासे कुटुम्बेन सह संस्कृतं वक्तुं आरभध्वम्। नूतनशिक्षार्थिमित्रम्, व्याकरणं न आवश्यकम्।',
  },
  badge: { en: 'New • June Batch', hi: 'नया • जून बैच', sa: 'नवीनम् • जून-सत्रम्' },
  duration: { en: '6 weeks', hi: '6 सप्ताह', sa: '६ सप्ताहाः' },
  cta: { en: 'View Course', hi: 'पाठ्यक्रम देखें', sa: 'पाठ्यक्रमं पश्यत' },
  level: { en: 'All Ages', hi: 'सभी आयु', sa: 'सर्ववयस्काः' },
};

const SpokenSanskritPromoCard: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift border border-border/50 flex flex-col">
      <Link to="/spoken-sanskrit" className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={sanskritHero}
            alt={t(tr.title)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0">
            <Sparkles className="h-3 w-3 mr-1" /> {t(tr.badge)}
          </Badge>
        </div>
      </Link>
      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs font-body">Sanskrit</Badge>
          <Badge className="text-xs font-body border bg-gray-100 text-gray-700 border-gray-200">
            {t(tr.level)}
          </Badge>
        </div>
        <Link to="/spoken-sanskrit">
          <h3 className="font-heading text-xl font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors break-words">
            {t(tr.title)}
          </h3>
        </Link>
        <p className="font-body text-muted-foreground text-sm line-clamp-2">{t(tr.desc)}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="font-body">{t(tr.duration)}</span>
          </div>
        </div>
        <div className="mt-auto pt-2">
          <Link to="/spoken-sanskrit">
            <Button variant="saffron" className="w-full group/btn">
              {t(tr.cta)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpokenSanskritPromoCard;
