
# Plan: Major Bodhika Landing Page Content & UX Update

## Overview

This plan covers a comprehensive update to the Bodhika landing page including new hero content, updated FAQs, specific testimonials, new sections (Value Stack, Program Structure, Class Format), pricing improvements, and updated CTAs. All changes will maintain mobile responsiveness across English, Hindi, and Sanskrit.

---

## Section 1: Hero Section Updates

**File:** `src/pages/BodhikaLanding.tsx`

### A. New Main Headline (H1)
Replace current headline with:
- EN: "Raise a Calm, Disciplined & Value-Rooted Child (Ages 6–12)"
- HI: "एक शांत, अनुशासित और मूल्य-निहित बच्चा पालें (आयु 6–12)"
- SA: "शान्तं अनुशासितं मूल्यमूलितं च बालकं पालयत (वयः ६–१२)"

### B. New Subheadline (SEO Optimized)
Replace current subheadline with:
- EN: "Bodhika is a 6-month live character development program that builds discipline, emotional balance, respect, and moral values in children using Sanatan life principles — in a child-friendly modern format."
- HI: "बोधिका 6 माह का लाइव चरित्र विकास कार्यक्रम है जो बच्चों में अनुशासन, भावनात्मक संतुलन, सम्मान और नैतिक मूल्यों का निर्माण करता है — सनातन जीवन सिद्धांतों का उपयोग करते हुए — बाल-अनुकूल आधुनिक प्रारूप में।"
- SA: "बोधिका षण्मासीयं जीवन्तचरित्रविकासकार्यक्रमम् अस्ति यत् बालकेषु अनुशासनं भावनात्मकसन्तुलनं आदरं नैतिकमूल्यानि च निर्माति — सनातनजीवनसिद्धान्तैः — बालोपयुक्तआधुनिकप्रारूपेण।"

### C. New 3 Benefit Bullets
Replace current 4 outcomes with 3 focused bullets:
1. "Improves focus, discipline & daily behavior"
2. "Builds emotional control & respectful habits"
3. "Develops strong cultural identity & values"

### D. Updated CTA Buttons
- Primary: "Book Free Parent Orientation" (with calendar icon)
- Secondary: "Talk to Counselor on WhatsApp" (with message icon)

---

## Section 2: FAQ Section Complete Replacement

**File:** `src/components/bodhika/ObjectionCrusherFAQ.tsx`

Replace all 8 existing FAQs with these 6 new ones:

| Q | Question | Answer |
|---|----------|--------|
| 1 | What language are classes conducted in? | Classes are conducted in simple Hindi + English mix so children easily understand concepts. |
| 2 | Are recordings available? | Yes. All live sessions are recorded and provided for revision. |
| 3 | What if my child misses a class? | Your child can watch the recording and also receive mentor guidance for missed topics. |
| 4 | Will this affect school studies? | No. Bodhika improves focus, discipline and learning habits which often help school performance. |
| 5 | Is this suitable for beginners with no background? | Yes. Bodhika is designed for absolute beginners. No prior knowledge is required. |
| 6 | Is there any exam or pressure? | No exams. No competition. No force. Learning is experience-based. |

---

## Section 3: Testimonials Update

**File:** `src/pages/BodhikaLanding.tsx`

Replace generic testimonials with specific parent testimonials including name + child age + city:

```text
1. Rajesh Sharma — Parent of 9-year-old | Delhi
   "My child now wakes up early, chants shlokas daily and shows calm behavior at home. Discipline has improved a lot."

2. Anita Verma — Parent of 8-year-old | Pune
   "Earlier my son was restless. After Bodhika he listens better and respects elders."

3. Suresh Iyer — Parent of 10-year-old | Bangalore
   "Finally a values-based program that teaches children without fear or pressure."
```

---

## Section 4: New "What You Get" Value Stack Section

**File:** `src/pages/BodhikaLanding.tsx`

Create a new component `ValueStackSection` to appear BEFORE the pricing section.

**Title:** "What Your Child Receives In Bodhika (6 Months)"

**8 Value Items:**
1. 48+ Live Interactive Classes
2. Mentor-Led Small Group Learning
3. Daily Habit-Building Activities
4. Shloka Meaning Practice
5. Character Development Exercises
6. Lifetime Recording Access
7. Parent Progress Updates
8. Cultural Learning Community

---

## Section 5: New Program Structure Section

**File:** `src/pages/BodhikaLanding.tsx`

Create a new component `ProgramStructureSection` to appear AFTER the Syllabus section.

**Title:** "How The 6-Month Bodhika Journey Works"

**6 Months Structure:**
- Month 1: Discipline & Routine Building
- Month 2: Respect, Manners & Sanskar
- Month 3: Emotional Control & Calmness
- Month 4: Dharma & Decision Making
- Month 5: Cultural Identity & Stories
- Month 6: Practice, Habit Formation & Application

---

## Section 6: Class Format Transparency Block

**File:** `src/pages/BodhikaLanding.tsx`

Add a Class Format card within the Learning Experience section:

- Classes: 2 sessions per week
- Duration: 60 minutes per class
- Daily practice: 10 minutes
- Mode: Live + Recording Access
- Batch Size: Limited students per mentor in focused batch

---

## Section 7: Pricing Psychology Improvements

**File:** `src/pages/BodhikaLanding.tsx`

### A. Add above pricing cards:
- Headline: "Choose The Right Learning Experience For Your Child"
- Caption: "Same curriculum — Different attention levels"

### B. Focused Batch Improvements:
- Add badge: "MOST RECOMMENDED FOR SERIOUS PARENTS"
- Add benefit bullets:
  - Individual progress tracking
  - Higher mentor interaction
  - Limited seats

### C. Update CTA button text to:
- "Reserve Seat For March Batch" or "Book Free Orientation"

---

## Section 8: CTA Button Text Updates Throughout

Update all CTA button text across the page:

| Location | Old Text | New Text |
|----------|----------|----------|
| Hero Primary | "Enroll Now" | "Book Free Parent Orientation" |
| Hero Secondary | "Talk to Counselor" | "Talk to Counselor on WhatsApp" |
| Pricing CTAs | "Enroll Now" | "Reserve Seat For March Batch" |
| Final Footer | Various | "Book Free Orientation" + "Talk to Counselor" |

---

## Section 9: Final Footer CTA Replacement

**File:** `src/pages/BodhikaLanding.tsx`

Update the FinalCTASection with:

- **Headline:** "Give Your Child Strong Values — Before The World Shapes Them"
- **Subline:** "March 2026 batch filling fast. Limited seats available."
- **Buttons:** 
  - Primary: "Book Free Orientation"
  - Secondary: "Talk to Counselor"

---

## Section Order After Changes

The page will have this flow:
1. Hero Section (updated headlines + CTAs)
2. Parent Pain Section
3. What Is Bodhika Section
4. Transformation Section
5. Syllabus Section
6. **Program Structure Section (NEW)**
7. Learning Section
8. Learning Experience Section + Class Format Block
9. **Value Stack Section (NEW)** - Before Pricing
10. Pricing Section (updated psychology + CTAs)
11. Testimonials Section (specific parents)
12. FAQ Section (new questions)
13. Founder Section
14. Final CTA Section (updated)
15. Sticky Mobile Footer

---

## Technical Implementation Summary

### Files to Modify:

| File | Changes |
|------|---------|
| `src/pages/BodhikaLanding.tsx` | Update translations, add new sections, modify component order |
| `src/components/bodhika/ObjectionCrusherFAQ.tsx` | Replace all FAQ content with new questions |

### New Sections to Create (within BodhikaLanding.tsx):
1. `ValueStackSection` component
2. `ProgramStructureSection` component
3. `ClassFormatBlock` (can be part of LearningExperienceSection)

### Translation Objects to Add/Update:
- Hero translations (heroHeadline, heroSubheadline, heroOutcome1-3)
- Hero CTA translations (heroPrimaryCTA, heroSecondaryCTA)
- FAQ translations (faq1Q-faq6Q, faq1A-faq6A)
- Testimonials data (with full names, child ages, cities)
- Value Stack translations (valueStackTitle, valueItem1-8)
- Program Structure translations (programTitle, month1-6)
- Class Format translations (classFormatTitle, formatItem1-5)
- Pricing section translations (pricingHeadline update, focusedBadge, CTAs)
- Final CTA translations (finalHeadline, finalSubline)

### Mobile Responsiveness:
All new sections will follow the existing mobile-first patterns:
- Use responsive text classes (`text-sm sm:text-base`)
- Responsive padding (`p-3 sm:p-4 md:p-6`)
- Grid layouts that collapse on mobile (`grid-cols-1 sm:grid-cols-2`)
- Language-aware sizing for Hindi/Sanskrit longer text
