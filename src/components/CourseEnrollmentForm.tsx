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

interface CourseEnrollmentFormProps {
  courseId: string;
  courseName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AGE_GROUPS = [
  { value: 'kids', label: 'Kids (5-12)', minAge: 5, maxAge: 12 },
  { value: 'teens', label: 'Teens (13-17)', minAge: 13, maxAge: 17 },
  { value: 'adults', label: 'Adults (18+)', minAge: 18, maxAge: 99 },
];

const CourseEnrollmentForm: React.FC<CourseEnrollmentFormProps> = ({
  courseId,
  courseName,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
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
        title: 'Error',
        description: 'Please fill in required fields',
        variant: 'destructive',
      });
      return;
    }

    // Validate age if manual input
    if (ageInputType === 'manual' && formData.age) {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        toast({
          title: 'Error',
          description: 'Please enter a valid age (1-120)',
          variant: 'destructive',
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      const referralLinkId = await getReferralLinkId();
      
      const { error } = await supabase.from('course_enrollments').insert({
        course_id: courseId,
        referral_link_id: referralLinkId,
        student_name: formData.studentName,
        email: formData.email,
        phone: formData.phone || null,
        age: ageInputType === 'manual' && formData.age ? parseInt(formData.age) : null,
        age_group: ageInputType === 'select' ? formData.ageGroup : null,
        message: formData.message || null,
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your enrollment request has been submitted. We will contact you soon.',
      });
      
      resetForm();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit enrollment',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Enroll in Course</DialogTitle>
          <DialogDescription>
            Register for: <strong>{courseName}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Full Name *</Label>
            <Input
              id="studentName"
              placeholder="Enter your full name"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 9674916567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* Age Selection with manual option */}
          <div className="space-y-3">
            <Label>Age</Label>
            <RadioGroup
              value={ageInputType}
              onValueChange={(v) => setAgeInputType(v as 'select' | 'manual')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="select" id="age-select" />
                <Label htmlFor="age-select" className="font-normal cursor-pointer">
                  Select age group
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="age-manual" />
                <Label htmlFor="age-manual" className="font-normal cursor-pointer">
                  Enter exact age
                </Label>
              </div>
            </RadioGroup>

            {ageInputType === 'select' ? (
              <Select
                value={formData.ageGroup}
                onValueChange={(v) => setFormData({ ...formData, ageGroup: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
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
                min={1}
                max={120}
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any questions or special requirements?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="saffron" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Submit Enrollment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollmentForm;
