import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import AILandingPagePreview from './AILandingPagePreview';

interface Batch {
  name: string;
  size: number;
  price: number;
  isHighlighted: boolean;
}

interface FormData {
  // Step 1
  courseName: string;
  transformationGoal: string;
  courseCategory: string;
  courseDuration: string;
  courseMode: string;
  languages: string[];
  // Step 2
  targetAudience: string[];
  courseNature: string;
  difficultyLevel: string;
  // Step 3
  numberOfModules: number;
  weeklyHours: number;
  teachingStyle: string[];
  certificateProvided: boolean;
  // Step 4
  batches: Batch[];
  scholarshipAvailable: boolean;
  limitedSeatsBadge: boolean;
  // Step 5
  institutionName: string;
  instructorName: string;
  yearsOfExperience: number;
  totalStudentsTaught: number;
  recognitions: string;
  // Step 6
  toneStyle: string;
}

interface AILandingPageGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  toast: any;
  onPageGenerated: () => void;
}

const STEPS = [
  { id: 1, title: 'Course Basics', description: 'Basic course information' },
  { id: 2, title: 'Target Audience', description: 'Who is this course for' },
  { id: 3, title: 'Course Structure', description: 'How the course is organized' },
  { id: 4, title: 'Batch & Pricing', description: 'Pricing and batch details' },
  { id: 5, title: 'Trust & Authority', description: 'Build credibility' },
  { id: 6, title: 'Tone & Style', description: 'Choose the voice' },
];

const CATEGORIES = ['Value Education', 'Spiritual', 'Skill-Based', 'Academic', 'Mixed'];
const MODES = ['Online', 'Offline', 'Hybrid'];
const LANGUAGES = ['Hindi', 'English', 'Sanskrit'];
const AUDIENCES = ['Kids', 'Teens', 'Adults', 'Parents'];
const NATURES = ['Foundation', 'Transformational', 'Life Education', 'Career Support', 'Spiritual Deep Dive'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const TEACHING_STYLES = ['Story Based', 'Practical', 'Scriptural + Modern', 'Interactive'];
const TONES = [
  { id: 'calm-spiritual', label: 'Calm & Spiritual', description: 'Peaceful, meditative language' },
  { id: 'powerful-transformational', label: 'Powerful & Transformational', description: 'Bold, inspiring language' },
  { id: 'modern-youthful', label: 'Modern & Youthful', description: 'Energetic, relatable language' },
  { id: 'traditional-authentic', label: 'Traditional & Authentic', description: 'Heritage-focused language' },
  { id: 'parent-friendly', label: 'Parent-Friendly & Trust-Based', description: 'Reassuring, safety-focused' },
];

const initialFormData: FormData = {
  courseName: '',
  transformationGoal: '',
  courseCategory: '',
  courseDuration: '',
  courseMode: '',
  languages: [],
  targetAudience: [],
  courseNature: '',
  difficultyLevel: '',
  numberOfModules: 4,
  weeklyHours: 2,
  teachingStyle: [],
  certificateProvided: false,
  batches: [{ name: 'Regular Batch', size: 30, price: 2999, isHighlighted: false }],
  scholarshipAvailable: false,
  limitedSeatsBadge: false,
  institutionName: 'Shastrakulam',
  instructorName: '',
  yearsOfExperience: 10,
  totalStudentsTaught: 1000,
  recognitions: '',
  toneStyle: '',
};

const AILandingPageGenerator: React.FC<AILandingPageGeneratorProps> = ({
  isOpen,
  onClose,
  toast,
  onPageGenerated
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'languages' | 'targetAudience' | 'teachingStyle', item: string) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(item)) {
        return { ...prev, [field]: arr.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...arr, item] };
      }
    });
  };

  const addBatch = () => {
    setFormData(prev => ({
      ...prev,
      batches: [...prev.batches, { name: '', size: 20, price: 0, isHighlighted: false }]
    }));
  };

  const updateBatch = (index: number, field: keyof Batch, value: any) => {
    setFormData(prev => ({
      ...prev,
      batches: prev.batches.map((b, i) => i === index ? { ...b, [field]: value } : b)
    }));
  };

  const removeBatch = (index: number) => {
    setFormData(prev => ({
      ...prev,
      batches: prev.batches.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.courseName && formData.transformationGoal && formData.courseCategory && 
                  formData.courseDuration && formData.courseMode && formData.languages.length > 0);
      case 2:
        return !!(formData.targetAudience.length > 0 && formData.courseNature && formData.difficultyLevel);
      case 3:
        return !!(formData.numberOfModules > 0 && formData.weeklyHours > 0 && formData.teachingStyle.length > 0);
      case 4:
        return formData.batches.length > 0 && formData.batches.every(b => b.name && b.price > 0);
      case 5:
        return !!formData.institutionName;
      case 6:
        return !!formData.toneStyle;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleGenerate();
      }
    } else {
      toast({
        title: 'Incomplete Information',
        description: 'Please fill all required fields before proceeding.',
        variant: 'destructive'
      });
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-landing-page', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedContent(data.content);
      setShowPreview(true);
      
      toast({
        title: 'Landing Page Generated!',
        description: 'Your AI-powered landing page is ready for preview.',
      });
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate landing page. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      const slug = formData.courseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const insertData = {
        course_name: formData.courseName,
        transformation_goal: formData.transformationGoal,
        course_category: formData.courseCategory,
        course_duration: formData.courseDuration,
        course_mode: formData.courseMode,
        languages: formData.languages,
        target_audience: formData.targetAudience,
        course_nature: formData.courseNature,
        difficulty_level: formData.difficultyLevel,
        number_of_modules: formData.numberOfModules,
        weekly_hours: formData.weeklyHours,
        teaching_style: formData.teachingStyle,
        certificate_provided: formData.certificateProvided,
        batches: JSON.parse(JSON.stringify(formData.batches)),
        scholarship_available: formData.scholarshipAvailable,
        limited_seats_badge: formData.limitedSeatsBadge,
        institution_name: formData.institutionName,
        instructor_name: formData.instructorName || null,
        years_of_experience: formData.yearsOfExperience || null,
        total_students_taught: formData.totalStudentsTaught || null,
        recognitions: formData.recognitions || null,
        tone_style: formData.toneStyle,
        generated_content: generatedContent ? JSON.parse(JSON.stringify(generatedContent)) : null,
        status,
        slug,
      };

      const { error } = await supabase
        .from('ai_landing_pages')
        .insert([insertData]);

      if (error) throw error;

      toast({
        title: status === 'published' ? 'Page Published!' : 'Draft Saved',
        description: status === 'published' 
          ? 'Your landing page is now live.' 
          : 'Your landing page has been saved as a draft.',
      });

      onPageGenerated();
      handleClose();
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: 'Save Failed',
        description: error.message || 'Failed to save landing page.',
        variant: 'destructive'
      });
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setGeneratedContent(null);
    setShowPreview(false);
    onClose();
  };

  if (showPreview && generatedContent) {
    return (
      <AILandingPagePreview
        isOpen={isOpen}
        content={generatedContent}
        formData={formData}
        onClose={() => setShowPreview(false)}
        onSave={handleSave}
        onRegenerate={handleGenerate}
        isRegenerating={isGenerating}
        toast={toast}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Landing Page Generator
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-lg mb-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep > step.id 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === step.id 
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                    : 'bg-muted-foreground/20 text-muted-foreground'
              }`}>
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              {index < STEPS.length - 1 && (
                <div className={`hidden sm:block w-8 lg:w-16 h-0.5 mx-1 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <div className="mb-4">
          <h3 className="font-heading text-lg font-semibold">
            Step {currentStep}: {STEPS[currentStep - 1].title}
          </h3>
          <p className="text-sm text-muted-foreground">{STEPS[currentStep - 1].description}</p>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label>Course Name *</Label>
                <Input 
                  value={formData.courseName}
                  onChange={(e) => updateFormData('courseName', e.target.value)}
                  placeholder="e.g., Vedic Mathematics Mastery"
                />
              </div>
              <div className="space-y-2">
                <Label>One-line Transformation Goal *</Label>
                <Textarea 
                  value={formData.transformationGoal}
                  onChange={(e) => updateFormData('transformationGoal', e.target.value)}
                  placeholder="e.g., Transform your child from math-anxious to math-confident"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.courseCategory} onValueChange={(v) => updateFormData('courseCategory', v)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration *</Label>
                  <Input 
                    value={formData.courseDuration}
                    onChange={(e) => updateFormData('courseDuration', e.target.value)}
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mode *</Label>
                <Select value={formData.courseMode} onValueChange={(v) => updateFormData('courseMode', v)}>
                  <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                  <SelectContent>
                    {MODES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Languages * (select all that apply)</Label>
                <div className="flex flex-wrap gap-3">
                  {LANGUAGES.map(lang => (
                    <label key={lang} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={formData.languages.includes(lang)}
                        onCheckedChange={() => toggleArrayItem('languages', lang)}
                      />
                      <span className="text-sm">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-2">
                <Label>Target Audience * (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {AUDIENCES.map(aud => (
                    <label key={aud} className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox 
                        checked={formData.targetAudience.includes(aud)}
                        onCheckedChange={() => toggleArrayItem('targetAudience', aud)}
                      />
                      <span className="text-sm font-medium">{aud}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Course Nature *</Label>
                <Select value={formData.courseNature} onValueChange={(v) => updateFormData('courseNature', v)}>
                  <SelectTrigger><SelectValue placeholder="Select course nature" /></SelectTrigger>
                  <SelectContent>
                    {NATURES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Difficulty Level *</Label>
                <Select value={formData.difficultyLevel} onValueChange={(v) => updateFormData('difficultyLevel', v)}>
                  <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Number of Modules *</Label>
                  <Input 
                    type="number"
                    min={1}
                    value={formData.numberOfModules}
                    onChange={(e) => updateFormData('numberOfModules', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weekly Time Commitment (hours) *</Label>
                  <Input 
                    type="number"
                    min={1}
                    value={formData.weeklyHours}
                    onChange={(e) => updateFormData('weeklyHours', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Teaching Style * (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {TEACHING_STYLES.map(style => (
                    <label key={style} className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox 
                        checked={formData.teachingStyle.includes(style)}
                        onCheckedChange={() => toggleArrayItem('teachingStyle', style)}
                      />
                      <span className="text-sm font-medium">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Certificate Provided</Label>
                  <p className="text-sm text-muted-foreground">Students receive a certificate on completion</p>
                </div>
                <Switch 
                  checked={formData.certificateProvided}
                  onCheckedChange={(v) => updateFormData('certificateProvided', v)}
                />
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Batches *</Label>
                  <Button variant="outline" size="sm" onClick={addBatch}>
                    <Plus className="h-4 w-4 mr-1" /> Add Batch
                  </Button>
                </div>
                {formData.batches.map((batch, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Batch {index + 1}</span>
                      {formData.batches.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeBatch(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Input 
                        placeholder="Batch Name"
                        value={batch.name}
                        onChange={(e) => updateBatch(index, 'name', e.target.value)}
                      />
                      <Input 
                        type="number"
                        placeholder="Batch Size"
                        value={batch.size}
                        onChange={(e) => updateBatch(index, 'size', parseInt(e.target.value) || 0)}
                      />
                      <Input 
                        type="number"
                        placeholder="Price (₹)"
                        value={batch.price}
                        onChange={(e) => updateBatch(index, 'price', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={batch.isHighlighted}
                        onCheckedChange={(v) => updateBatch(index, 'isHighlighted', v)}
                      />
                      <span className="text-sm">Highlight as recommended</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Scholarship Available</Label>
                  <p className="text-sm text-muted-foreground">Show scholarship note on pricing</p>
                </div>
                <Switch 
                  checked={formData.scholarshipAvailable}
                  onCheckedChange={(v) => updateFormData('scholarshipAvailable', v)}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Limited Seats Badge</Label>
                  <p className="text-sm text-muted-foreground">Add urgency with limited seats messaging</p>
                </div>
                <Switch 
                  checked={formData.limitedSeatsBadge}
                  onCheckedChange={(v) => updateFormData('limitedSeatsBadge', v)}
                />
              </div>
            </>
          )}

          {currentStep === 5 && (
            <>
              <div className="space-y-2">
                <Label>Institution Name *</Label>
                <Input 
                  value={formData.institutionName}
                  onChange={(e) => updateFormData('institutionName', e.target.value)}
                  placeholder="e.g., Shastrakulam"
                />
              </div>
              <div className="space-y-2">
                <Label>Instructor Name (Optional)</Label>
                <Input 
                  value={formData.instructorName}
                  onChange={(e) => updateFormData('instructorName', e.target.value)}
                  placeholder="e.g., Dr. Rajesh Sharma"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Input 
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => updateFormData('yearsOfExperience', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Students Taught</Label>
                  <Input 
                    type="number"
                    value={formData.totalStudentsTaught}
                    onChange={(e) => updateFormData('totalStudentsTaught', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recognitions / Achievements (Optional)</Label>
                <Textarea 
                  value={formData.recognitions}
                  onChange={(e) => updateFormData('recognitions', e.target.value)}
                  placeholder="e.g., Featured in Times of India, Winner of National Education Award..."
                  rows={3}
                />
              </div>
            </>
          )}

          {currentStep === 6 && (
            <>
              <div className="space-y-2">
                <Label>Select the tone for your landing page *</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  This will influence how the AI writes all the copy for your page.
                </p>
                <div className="space-y-3">
                  {TONES.map(tone => (
                    <label 
                      key={tone.id} 
                      className={`flex items-start gap-3 cursor-pointer p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                        formData.toneStyle === tone.id ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="tone"
                        value={tone.id}
                        checked={formData.toneStyle === tone.id}
                        onChange={(e) => updateFormData('toneStyle', e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <span className="font-medium">{tone.label}</span>
                        <p className="text-sm text-muted-foreground">{tone.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <Button
            variant="outline"
            onClick={() => currentStep > 1 ? setCurrentStep(prev => prev - 1) : handleClose()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {currentStep > 1 ? 'Previous' : 'Cancel'}
          </Button>
          <Button onClick={handleNext} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : currentStep === 6 ? (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Landing Page
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AILandingPageGenerator;
