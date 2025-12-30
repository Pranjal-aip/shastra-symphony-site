import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sun, Calendar, MapPin, Users, Clock, Filter, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const seoData = {
  title: {
    en: 'Seasonal Camps - Sanskrit & Yoga Retreats',
    hi: 'मौसमी शिविर - संस्कृत और योग शिविर',
    sa: 'ऋतुशिविराणि - संस्कृतयोगशिविराणि'
  },
  description: {
    en: 'Join immersive seasonal camps for Sanskrit learning, yoga, meditation, and cultural experiences. Perfect for kids, teens, and families during vacations.',
    hi: 'संस्कृत सीखने, योग, ध्यान और सांस्कृतिक अनुभवों के लिए गहन मौसमी शिविरों में शामिल हों। छुट्टियों के दौरान बच्चों, किशोरों और परिवारों के लिए उपयुक्त।',
    sa: 'संस्कृतशिक्षणस्य योगस्य ध्यानस्य सांस्कृतिकानुभवानां च कृते गहनऋतुशिविरेषु सम्मिलत। अवकाशकाले बालकानां किशोराणां कुटुम्बानां च कृते उपयुक्तम्।'
  }
};

interface Camp {
  id: string;
  title_en: string;
  title_hi: string | null;
  title_sa: string | null;
  description_en: string | null;
  description_hi: string | null;
  description_sa: string | null;
  thumbnail: string | null;
  start_date: string;
  end_date: string;
  age_category: string;
  age_min: number | null;
  age_max: number | null;
  location: string | null;
  price: string | null;
  registration_link: string | null;
  is_active: boolean;
}

const translations = {
  pageTitle: {
    en: 'Seasonal Camps',
    hi: 'मौसमी शिविर',
    sa: 'ऋतुशिविराणि'
  },
  pageSubtitle: {
    en: 'Immersive short-term experiences for children and families.',
    hi: 'बच्चों और परिवारों के लिए गहन अल्पकालिक अनुभव।',
    sa: 'बालकानां कुटुम्बानां च कृते गहनानि अल्पकालिकानुभवानि।'
  },
  upcoming: {
    en: 'Upcoming',
    hi: 'आगामी',
    sa: 'आगामी'
  },
  past: {
    en: 'Past',
    hi: 'बीते हुए',
    sa: 'अतीत'
  },
  all: {
    en: 'All Camps',
    hi: 'सभी शिविर',
    sa: 'सर्वशिविराणि'
  },
  filterByAge: {
    en: 'Filter by Age',
    hi: 'आयु के अनुसार फ़िल्टर करें',
    sa: 'वयसा फिल्टर्'
  },
  registerInterest: {
    en: 'Register Interest',
    hi: 'रुचि दर्ज करें',
    sa: 'रुचिं पञ्जीकुर्वन्तु'
  },
  noCamps: {
    en: 'No camps found',
    hi: 'कोई शिविर नहीं मिला',
    sa: 'न कोऽपि शिविरः प्राप्तः'
  },
  location: {
    en: 'Location',
    hi: 'स्थान',
    sa: 'स्थानम्'
  },
  dates: {
    en: 'Dates',
    hi: 'तारीखें',
    sa: 'दिनाङ्काः'
  },
  ageGroup: {
    en: 'Age Group',
    hi: 'आयु समूह',
    sa: 'वयःसमूहः'
  },
  allAges: {
    en: 'All Ages',
    hi: 'सभी आयु',
    sa: 'सर्ववयस्काः'
  },
  ctaTitle: {
    en: "Can't find what you're looking for?",
    hi: 'जो आप खोज रहे हैं वह नहीं मिल रहा?',
    sa: 'यद् भवन्तः अन्विष्यन्ति तत् न प्राप्यते?'
  },
  ctaDesc: {
    en: 'Contact us to learn about upcoming camps or suggest a new program for your community.',
    hi: 'आगामी शिविरों के बारे में जानने या अपने समुदाय के लिए नया कार्यक्रम सुझाने के लिए हमसे संपर्क करें।',
    sa: 'आगामिशिविराणां विषये ज्ञातुं स्वसमुदायस्य कृते नूतनं कार्यक्रमं सूचयितुं वा अस्मान् सम्पर्कयत।'
  },
  contactUs: {
    en: 'Contact Us',
    hi: 'संपर्क करें',
    sa: 'सम्पर्कं कुरुत'
  }
};

const ageCategories = [
  { value: 'all', label: { en: 'All Ages', hi: 'सभी आयु', sa: 'सर्ववयस्काः' } },
  { value: 'kids', label: { en: 'Kids (5-10)', hi: 'बच्चे (5-10)', sa: 'बालकाः (५-१०)' } },
  { value: 'teens', label: { en: 'Teens (11-17)', hi: 'किशोर (11-17)', sa: 'किशोराः (११-१७)' } },
  { value: 'adults', label: { en: 'Adults (18+)', hi: 'वयस्क (18+)', sa: 'वयस्काः (१८+)' } },
  { value: 'family', label: { en: 'Family', hi: 'परिवार', sa: 'कुटुम्बम्' } },
];

const Camps: React.FC = () => {
  const { t, language } = useLanguage();
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [ageFilter, setAgeFilter] = useState<string>('all');

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('camps')
      .select('*')
      .eq('is_active', true)
      .order('start_date', { ascending: true });
    
    if (data) {
      setCamps(data);
    }
    setLoading(false);
  };

  const today = new Date().toISOString().split('T')[0];

  const filteredCamps = camps.filter(camp => {
    // Time filter
    if (timeFilter === 'upcoming' && camp.start_date < today) return false;
    if (timeFilter === 'past' && camp.start_date >= today) return false;
    
    // Age filter
    if (ageFilter !== 'all' && camp.age_category !== ageFilter) return false;
    
    return true;
  });

  const getTitle = (camp: Camp) => {
    if (language === 'hi' && camp.title_hi) return camp.title_hi;
    if (language === 'sa' && camp.title_sa) return camp.title_sa;
    return camp.title_en;
  };

  const getDescription = (camp: Camp) => {
    if (language === 'hi' && camp.description_hi) return camp.description_hi;
    if (language === 'sa' && camp.description_sa) return camp.description_sa;
    return camp.description_en;
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const getAgeLabel = (category: string, ageMin: number | null, ageMax: number | null) => {
    const cat = ageCategories.find(c => c.value === category);
    const label = cat ? t(cat.label) : category;
    
    if (ageMin !== null && ageMax !== null) {
      return `${label} (${ageMin}-${ageMax} yrs)`;
    } else if (ageMin !== null) {
      return `${label} (${ageMin}+ yrs)`;
    } else if (ageMax !== null) {
      return `${label} (up to ${ageMax} yrs)`;
    }
    return label;
  };

  const isUpcoming = (startDate: string) => startDate >= today;

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="Sanskrit camps India, yoga camps for kids, cultural immersion camps, Vedic summer camps"
        url="/camps"
      />
      {/* Hero Section */}
      <section className="relative py-16 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-lotus-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader 
            title={t(translations.pageTitle)} 
            subtitle={t(translations.pageSubtitle)} 
          />
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-card border-b border-border sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            {/* Time Filter */}
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <Button
                variant={timeFilter === 'upcoming' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeFilter('upcoming')}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                {t(translations.upcoming)}
              </Button>
              <Button
                variant={timeFilter === 'past' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeFilter('past')}
                className="gap-2"
              >
                <Clock className="h-4 w-4" />
                {t(translations.past)}
              </Button>
              <Button
                variant={timeFilter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeFilter('all')}
              >
                {t(translations.all)}
              </Button>
            </div>

            {/* Age Filter */}
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t(translations.filterByAge)} />
              </SelectTrigger>
              <SelectContent>
                {ageCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {t(cat.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Camps Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredCamps.length === 0 ? (
            <div className="text-center py-20">
              <Sun className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="font-body text-xl text-muted-foreground">{t(translations.noCamps)}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCamps.map((camp) => (
                <div 
                  key={camp.id} 
                  className="bg-card rounded-2xl shadow-card border border-border overflow-hidden hover-lift group"
                >
                  {/* Camp Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={camp.thumbnail || '/placeholder.svg'} 
                      alt={getTitle(camp)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant={isUpcoming(camp.start_date) ? 'default' : 'secondary'}
                        className={isUpcoming(camp.start_date) ? 'bg-accent text-accent-foreground' : ''}
                      >
                        {isUpcoming(camp.start_date) ? t(translations.upcoming) : t(translations.past)}
                      </Badge>
                    </div>
                    {camp.price && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
                          {camp.price}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Camp Details */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-heading text-xl font-bold text-foreground line-clamp-2">
                      {getTitle(camp)}
                    </h3>
                    
                    <p className="font-body text-muted-foreground line-clamp-3">
                      {getDescription(camp)}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>{formatDateRange(camp.start_date, camp.end_date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{getAgeLabel(camp.age_category, camp.age_min, camp.age_max)}</span>
                      </div>

                      {camp.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{camp.location}</span>
                        </div>
                      )}
                    </div>

                    {isUpcoming(camp.start_date) && (
                      <Link to={camp.registration_link || '/contact'}>
                        <Button variant="maroon-outline" className="w-full mt-4">
                          {t(translations.registerInterest)}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t(translations.ctaTitle)}
          </h2>
          <p className="font-body text-muted-foreground mb-6 max-w-xl mx-auto">
            {t(translations.ctaDesc)}
          </p>
          <Link to="/contact">
            <Button variant="saffron" size="lg">
              {t(translations.contactUs)}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Camps;
