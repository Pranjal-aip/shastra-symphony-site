
# Plan: Update All Phone Numbers to 86794 41338

## Overview
Replace all instances of the old phone number (96749 16567 / 919674916567) with the new phone number (86794 41338 / 918679441338) across the entire website.

## Files to Modify

### 1. `src/components/WhatsAppButton.tsx`
**Line 10:** Change default phoneNumber from `'919674916567'` to `'918679441338'`

### 2. `src/components/Footer.tsx`
**Lines 140-143:** Update phone link and display text:
- `href="tel:+919674916567"` → `href="tel:+918679441338"`
- `+91 96749 16567` → `+91 86794 41338`

### 3. `src/pages/BodhikaLanding.tsx`
**Line 51:** Change WhatsApp number constant:
- `const WHATSAPP_NUMBER = '919674916567'` → `const WHATSAPP_NUMBER = '918679441338'`

### 4. `src/pages/Bodhika.tsx`
**Line 466:** Change WhatsApp number:
- `const whatsappNumber = "919674916567"` → `const whatsappNumber = "918679441338"`

### 5. `src/pages/CourseDetail.tsx`
**Line 191:** Update WhatsApp link:
- `href="https://wa.me/919674916567"` → `href="https://wa.me/918679441338"`

### 6. `src/pages/Contact.tsx`
**Line 190:** Update displayed phone number:
- `+91 96749 16567` → `+91 86794 41338`

### 7. `src/pages/Index.tsx`
**Line 116:** Update WhatsApp link:
- `href="https://wa.me/919674916567"` → `href="https://wa.me/918679441338"`

### 8. `src/pages/AdminDashboard.tsx`
**Lines 2244 & 2252:** Update placeholder and default values:
- `+91 96749 16567` → `+91 86794 41338` (both instances)

### 9. `index.html`
**Lines 134 & 199:** Update structured data phone numbers:
- `"+91-96749-16567"` → `"+91-86794-41338"` (both EducationalOrganization and LocalBusiness schemas)

## Summary Table

| File | Old Number | New Number | Type |
|------|------------|------------|------|
| WhatsAppButton.tsx | 919674916567 | 918679441338 | WhatsApp |
| Footer.tsx | +91 96749 16567 | +91 86794 41338 | Display + tel: |
| BodhikaLanding.tsx | 919674916567 | 918679441338 | WhatsApp |
| Bodhika.tsx | 919674916567 | 918679441338 | WhatsApp |
| CourseDetail.tsx | 919674916567 | 918679441338 | WhatsApp |
| Contact.tsx | +91 96749 16567 | +91 86794 41338 | Display |
| Index.tsx | 919674916567 | 918679441338 | WhatsApp |
| AdminDashboard.tsx | +91 96749 16567 | +91 86794 41338 | Placeholder |
| index.html | +91-96749-16567 | +91-86794-41338 | Schema.org |

## Total Changes
- **9 files** will be modified
- **11 phone number instances** will be updated
