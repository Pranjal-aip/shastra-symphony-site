import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useReferral } from '@/hooks/useReferral';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Graphy Product IDs for Bodhika batches
const GRAPHY_PRODUCT_IDS = {
  group: 'Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27',
  focused: 'Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42'
};

// Course IDs in database (these are the hardcoded course identifiers for Bodhika)
const BODHIKA_COURSE_IDS = {
  group: 'bodhika-group-batch',
  focused: 'bodhika-focused-batch'
};

interface BodhikaEnrollmentFormProps {
  batchType: 'group' | 'focused';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AGE_GROUPS = [
  { value: 'kids', label: 'Kids (5-12)', minAge: 5, maxAge: 12 },
  { value: 'teens', label: 'Teens (13-17)', minAge: 13, maxAge: 17 },
];

const translations = {
  enrollTitle: {
    en: 'Enroll in Bodhika',
    hi: 'बोधिका में नामांकन करें',
    sa: 'बोधिकायां नामाङ्कनं कुरुत'
  },
  groupBatch: {
    en: 'Group Batch (50-60 students) - ₹6,000/year',
    hi: 'ग्रुप बैच (50-60 छात्र) - ₹6,000/वर्ष',
    sa: 'समूहवर्गः (५०-६० छात्राः) - ₹६,०००/वर्षम्'
  },
  focusedBatch: {
    en: 'Focused Batch (12 students) - ₹13,000/year',
    hi: 'फोकस्ड बैच (12 छात्र) - ₹13,000/वर्ष',
    sa: 'केन्द्रितवर्गः (१२ छात्राः) - ₹१३,०००/वर्षम्'
  },
  fullName: { en: 'Full Name *', hi: 'पूरा नाम *', sa: 'पूर्णनाम *' },
  email: { en: 'Email *', hi: 'ईमेल *', sa: 'विद्युत्पत्रम् *' },
  phone: { en: 'Phone Number', hi: 'फोन नंबर', sa: 'दूरवाणीसंख्या' },
  age: { en: 'Age', hi: 'आयु', sa: 'वयः' },
  selectAgeGroup: { en: 'Select age group', hi: 'आयु वर्ग चुनें', sa: 'वयोवर्गं चिनुत' },
  enterExactAge: { en: 'Enter exact age', hi: 'सटीक आयु दर्ज करें', sa: 'निश्चितवयः दीयताम्' },
  message: { en: 'Message (Optional)', hi: 'संदेश (वैकल्पिक)', sa: 'सन्देशः (वैकल्पिकम्)' },
  messagePlaceholder: { en: 'Any questions or special requirements?', hi: 'कोई प्रश्न या विशेष आवश्यकता?', sa: 'कश्चन प्रश्नः विशेषावश्यकता वा?' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', sa: 'रद्धीकुरुत' },
  submitEnrollment: { en: 'Submit Enrollment', hi: 'नामांकन जमा करें', sa: 'नामाङ्कनं प्रेषयत' },
  successTitle: { en: 'Redirecting to Payment...', hi: 'भुगतान पर पुनर्निर्देशित किया जा रहा है...', sa: 'भुगतानं प्रति प्रेष्यते...' },
  successDesc: { en: 'Please complete your payment on the next page.', hi: 'कृपया अगले पृष्ठ पर अपना भुगतान पूरा करें।', sa: 'कृपया अग्रिमपृष्ठे भवतः भुगतानं पूर्णं कुरुत।' },
  proceedToPayment: { en: 'Proceed to Payment', hi: 'भुगतान करें', sa: 'भुगतानं कुरुत' },
  redirecting: { en: 'Redirecting...', hi: 'पुनर्निर्देशित...', sa: 'प्रेष्यते...' },
  errorTitle: { en: 'Error', hi: 'त्रुटि', sa: 'त्रुटिः' },
  requiredFields: { en: 'Please fill in required fields', hi: 'कृपया आवश्यक फ़ील्ड भरें', sa: 'कृपया आवश्यकक्षेत्राणि पूरयत' },
  validAge: { en: 'Please enter a valid age (5-17)', hi: 'कृपया वैध आयु दर्ज करें (5-17)', sa: 'कृपया वैधवयः दीयताम् (५-१७)' },
};

const BodhikaEnrollmentForm: React.FC<BodhikaEnrollmentFormProps> = ({
  batchType,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { getReferralLinkId } = useReferral();
  const [isLoading, setIsLoading] = useState(false);
  const [ageInputType, setAgeInputType] = useState<'select' | 'manual'>('select');
  
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    ageGroup: '',
    age: '',
    message: '',
  });

  const getText = (key: keyof typeof translations) => {
    return translations[key][language as 'en' | 'hi' | 'sa'] || translations[key].en;
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      email: '',
      phone: '',
      ageGroup: '',
      age: '',
      message: '',
    });
    setAgeInputType('select');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.email) {
      toast({
        title: getText('errorTitle'),
        description: getText('requiredFields'),
        variant: 'destructive',
      });
      return;
    }

    // Validate age if manual input (Bodhika is for 5-17 age)
    if (ageInputType === 'manual' && formData.age) {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 5 || ageNum > 17) {
        toast({
          title: getText('errorTitle'),
          description: getText('validAge'),
          variant: 'destructive',
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      const referralLinkId = await getReferralLinkId();
      
      // First, find or create the Bodhika course entry
      const courseId = BODHIKA_COURSE_IDS[batchType];
      const graphyProductId = GRAPHY_PRODUCT_IDS[batchType];
      
      // Check if course exists
      const { data: existingCourse } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', courseId)
        .single();
      
      let actualCourseId: string;
      
      if (existingCourse) {
        actualCourseId = existingCourse.id;
      } else {
        // Create the course entry
        const { data: newCourse, error: courseError } = await supabase
          .from('courses')
          .insert({
            slug: courseId,
            title_en: batchType === 'group' ? 'Bodhika - Group Batch' : 'Bodhika - Focused Batch',
            title_hi: batchType === 'group' ? 'बोधिका - ग्रुप बैच' : 'बोधिका - फोकस्ड बैच',
            category: 'Bodhika',
            level: 'Beginner',
            price: batchType === 'group' ? '₹6,000' : '₹13,000',
            graphy_product_id: graphyProductId,
            short_description_en: batchType === 'group' 
              ? '1-Year Sanatan Dharma program for 50-60 students' 
              : '1-Year Sanatan Dharma program for 12 students with personalized attention',
          })
          .select('id')
          .single();
        
        if (courseError) throw courseError;
        actualCourseId = newCourse!.id;
      }

      // Create enrollment
      const { error } = await supabase.from('course_enrollments').insert({
        course_id: actualCourseId,
        referral_link_id: referralLinkId,
        student_name: formData.studentName,
        email: formData.email,
        phone: formData.phone || null,
        age: ageInputType === 'manual' && formData.age ? parseInt(formData.age) : null,
        age_group: ageInputType === 'select' ? formData.ageGroup : null,
        message: formData.message || null,
        status: 'pending',
      });

      if (error) throw error;

      // Call graphy-sync edge function to create learner in Graphy
      const { data: syncResult, error: syncError } = await supabase.functions.invoke('graphy-sync', {
        body: { 
          action: 'create-learner',
          name: formData.studentName,
          email: formData.email,
          phone: formData.phone || null,
        }
      });

      if (syncError) {
        console.warn('Graphy sync warning:', syncError);
        // Don't block payment redirect even if Graphy sync fails
      }

      toast({
        title: getText('successTitle'),
        description: getText('successDesc'),
      });

      // Build Graphy direct payment/checkout URL
      const graphyPaymentUrl = `https://learn.shastrakulam.com/courses/${graphyProductId}/buy?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.studentName)}`;
      
      // Small delay to show toast, then redirect
      setTimeout(() => {
        window.location.href = graphyPaymentUrl;
      }, 500);
      
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: getText('errorTitle'),
        description: error.message || 'Failed to submit enrollment',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const batchLabel = batchType === 'group' ? getText('groupBatch') : getText('focusedBatch');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">{getText('enrollTitle')}</DialogTitle>
          <DialogDescription>
            <strong>{batchLabel}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">{getText('fullName')}</Label>
            <Input
              id="studentName"
              placeholder="Enter full name"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{getText('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{getText('phone')}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 9674916567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* Age Selection */}
          <div className="space-y-3">
            <Label>{getText('age')}</Label>
            <RadioGroup
              value={ageInputType}
              onValueChange={(v) => setAgeInputType(v as 'select' | 'manual')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="select" id="age-select" />
                <Label htmlFor="age-select" className="font-normal cursor-pointer">
                  {getText('selectAgeGroup')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="age-manual" />
                <Label htmlFor="age-manual" className="font-normal cursor-pointer">
                  {getText('enterExactAge')}
                </Label>
              </div>
            </RadioGroup>

            {ageInputType === 'select' ? (
              <Select
                value={formData.ageGroup}
                onValueChange={(v) => setFormData({ ...formData, ageGroup: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={getText('selectAgeGroup')} />
                </SelectTrigger>
                <SelectContent>
                  {AGE_GROUPS.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="number"
                min={5}
                max={17}
                placeholder="Enter age (5-17)"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{getText('message')}</Label>
            <Textarea
              id="message"
              placeholder={getText('messagePlaceholder')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {getText('cancel')}
            </Button>
            <Button type="submit" variant="saffron" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isLoading ? getText('redirecting') : getText('proceedToPayment')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BodhikaEnrollmentForm;
