import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const translations = {
  en: {
    title: "Complete Your Enrollment",
    subtitle: "Fill in your details to proceed to payment",
    studentName: "Student Name",
    email: "Email Address",
    phone: "Phone Number",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    age: "Age",
    state: "State",
    selectState: "Select your state",
    submit: "Proceed to Payment",
    submitting: "Processing...",
    success: "Enrollment submitted successfully!",
    error: "Something went wrong. Please try again.",
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidAge: "Age must be between 5 and 18",
  },
  hi: {
    title: "अपना नामांकन पूरा करें",
    subtitle: "भुगतान के लिए अपना विवरण भरें",
    studentName: "छात्र का नाम",
    email: "ईमेल पता",
    phone: "फ़ोन नंबर",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    age: "आयु",
    state: "राज्य",
    selectState: "अपना राज्य चुनें",
    submit: "भुगतान के लिए आगे बढ़ें",
    submitting: "प्रोसेसिंग...",
    success: "नामांकन सफलतापूर्वक सबमिट!",
    error: "कुछ गड़बड़ हुई। पुनः प्रयास करें।",
    required: "यह फ़ील्ड आवश्यक है",
    invalidEmail: "कृपया एक मान्य ईमेल दर्ज करें",
    invalidAge: "आयु 5 से 18 के बीच होनी चाहिए",
  },
  sa: {
    title: "स्वनामाङ्कनं पूर्णं कुरुत",
    subtitle: "भुगतानार्थं स्वविवरणं पूरयतु",
    studentName: "छात्रस्य नाम",
    email: "ईमेल पता",
    phone: "दूरभाष सङ्ख्या",
    gender: "लिङ्गम्",
    male: "पुरुषः",
    female: "स्त्री",
    other: "अन्यः",
    age: "वयः",
    state: "राज्यम्",
    selectState: "स्वराज्यं चिनुत",
    submit: "भुगतानाय अग्रे गच्छतु",
    submitting: "प्रक्रियायाम्...",
    success: "नामाङ्कनं सफलतया प्रेषितम्!",
    error: "किमपि असामान्यम्। पुनः प्रयतताम्।",
    required: "एतत् क्षेत्रम् आवश्यकम्",
    invalidEmail: "वैध ईमेल प्रविष्टं कुर्वन्तु",
    invalidAge: "वयः 5 तः 18 मध्ये भवेत्",
  },
};

// Graphy product configurations
const GRAPHY_PRODUCTS = {
  group: {
    id: "695393a483bcbf4ec9283f27",
    slug: "Bodhika--Awakening-Young-Minds-60-students-batch-695393a483bcbf4ec9283f27",
  },
  focused: {
    id: "6953f67fba62d03beeceac42",
    slug: "Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42",
  },
};

// Find Bodhika course ID from database (we'll use a fixed one for now)
const BODHIKA_COURSE_ID = "695393a4-83bc-bf4e-c928-3f27695393a4"; // Placeholder - will be matched by title

interface BodhikaEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batchType: "group" | "focused";
}

const enrollmentSchema = z.object({
  studentName: z.string().min(1, "Required").max(100),
  email: z.string().email("Invalid email").max(255),
  phone: z.string().max(20).optional(),
  gender: z.enum(["male", "female", "other"]),
  age: z.coerce.number().min(5).max(18),
  state: z.string().min(1, "Required"),
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

export function BodhikaEnrollmentDialog({
  open,
  onOpenChange,
  batchType,
}: BodhikaEnrollmentDialogProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = translations[language as keyof typeof translations] || translations.en;

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      studentName: "",
      email: "",
      phone: "",
      gender: undefined,
      age: undefined,
      state: "",
    },
  });

  const onSubmit = async (values: EnrollmentFormValues) => {
    setIsSubmitting(true);

    // Generate enrollment ID client-side to avoid needing SELECT after INSERT
    const enrollmentId = crypto.randomUUID();
    const graphyProduct = GRAPHY_PRODUCTS[batchType];
    const checkoutUrl = `https://learn.shastrakulam.com/courses/${graphyProduct.slug}?email=${encodeURIComponent(values.email)}`;

    try {
      // First, find the Bodhika course in the database
      const { data: courseData } = await supabase
        .from("courses")
        .select("id")
        .ilike("title_en", "%Bodhika%")
        .limit(1)
        .maybeSingle();

      const courseId = courseData?.id;

      if (!courseId) {
        console.warn("Bodhika course not found in database, proceeding without course link");
      }

      // Insert enrollment into database (no .select() to avoid RLS SELECT requirement)
      const { error: insertError } = await supabase
        .from("course_enrollments")
        .insert({
          id: enrollmentId,
          student_name: values.studentName,
          email: values.email,
          phone: values.phone || null,
          gender: values.gender,
          age: values.age,
          state: values.state,
          course_id: courseId || "00000000-0000-0000-0000-000000000000",
          status: "pending",
          graphy_sync_status: "pending",
        });

      if (insertError) {
        console.error("Enrollment insert error:", insertError);
        throw new Error(insertError.message);
      }

      // Call graphy-sync edge function (non-blocking)
      supabase.functions.invoke("graphy-sync", {
        body: {
          action: "sync_enrollment",
          email: values.email,
          name: values.studentName,
          mobile: values.phone,
          productId: graphyProduct.id,
          enrollmentId: enrollmentId,
        },
      }).catch((err) => {
        console.error("Graphy sync error:", err);
      });

      toast({
        title: t.success,
        description: "Redirecting to payment...",
      });

      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
      
      // Redirect in same tab to avoid popup blockers
      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: t.error,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.studentName} *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.email} *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="parent@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.phone}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+91 98765 43210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.gender} *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">{t.male}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">{t.female}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">{t.other}</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.age} *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={5}
                      max={18}
                      placeholder="10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.state} *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectState} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              variant="saffron"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.submit
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
