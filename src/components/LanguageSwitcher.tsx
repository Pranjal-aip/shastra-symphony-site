import React from 'react';
import { useLanguage, Language, languageLabels } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const languageShortLabels: Record<Language, string> = {
  hi: 'हि',
  en: 'EN',
  sa: 'सं',
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ['hi', 'en', 'sa'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1 font-body text-sm border-primary/30 hover:border-primary hover:bg-primary/10 min-w-[70px]"
        >
          <span className="font-semibold">{languageShortLabels[language]}</span>
          <span className="hidden sm:inline text-muted-foreground">|</span>
          <span className="hidden sm:inline">{languageLabels[language]}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer font-body gap-3 ${
              language === lang ? 'bg-primary/10 text-primary font-semibold' : ''
            }`}
          >
            <span className="w-6 text-center font-semibold">{languageShortLabels[lang]}</span>
            <span>{languageLabels[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
