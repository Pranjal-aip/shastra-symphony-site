import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  RefreshCw, 
  Save, 
  Send, 
  X,
  Edit3,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';

interface AILandingPagePreviewProps {
  isOpen: boolean;
  content: any;
  formData: any;
  onClose: () => void;
  onSave: (status: 'draft' | 'published') => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  toast: any;
}

type ViewMode = 'desktop' | 'mobile';
type Lang = 'en' | 'hi' | 'sa';

const AILandingPagePreview: React.FC<AILandingPagePreviewProps> = ({
  isOpen,
  content,
  formData,
  onClose,
  onSave,
  onRegenerate,
  isRegenerating,
  toast
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [previewLang, setPreviewLang] = useState<Lang>('en');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<any>(content);
  const [expandedSections, setExpandedSections] = useState<string[]>(['hero']);

  const getText = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[previewLang] || obj.en || '';
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateSectionContent = (sectionPath: string, value: string) => {
    const paths = sectionPath.split('.');
    setEditedContent((prev: any) => {
      const newContent = { ...prev };
      let current = newContent;
      for (let i = 0; i < paths.length - 1; i++) {
        current[paths[i]] = { ...current[paths[i]] };
        current = current[paths[i]];
      }
      const lastKey = paths[paths.length - 1];
      if (typeof current[lastKey] === 'object') {
        current[lastKey] = { ...current[lastKey], [previewLang]: value };
      } else {
        current[lastKey] = value;
      }
      return newContent;
    });
  };

  const sections = [
    { id: 'hero', title: 'Hero Section' },
    { id: 'coursePurpose', title: 'Course Purpose' },
    { id: 'whoShouldJoin', title: 'Who Should Join' },
    { id: 'whatYouWillLearn', title: 'What You Will Learn' },
    { id: 'courseStructure', title: 'Course Structure' },
    { id: 'pricing', title: 'Pricing' },
    { id: 'whyChooseUs', title: 'Why Choose Us' },
    { id: 'faqs', title: 'FAQs' },
    { id: 'finalCta', title: 'Final CTA' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-lg font-semibold">
              Preview: {formData.courseName}
            </DialogTitle>
            <div className="flex items-center gap-1 bg-background rounded-lg p-1 border">
              <Button 
                variant={viewMode === 'desktop' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'mobile' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1 bg-background rounded-lg p-1 border">
              {(['en', 'hi', 'sa'] as Lang[]).map(lang => (
                <Button
                  key={lang}
                  variant={previewLang === lang ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewLang(lang)}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'सं'}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onRegenerate} disabled={isRegenerating}>
              <RefreshCw className={`h-4 w-4 mr-1 ${isRegenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
            <Button variant="outline" size="sm" onClick={() => onSave('draft')}>
              <Save className="h-4 w-4 mr-1" />
              Save Draft
            </Button>
            <Button size="sm" onClick={() => onSave('published')}>
              <Send className="h-4 w-4 mr-1" />
              Publish
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Editor Sidebar */}
          <div className="w-80 border-r overflow-y-auto bg-muted/20 p-4 space-y-2">
            <h3 className="font-semibold text-sm mb-3">Edit Sections</h3>
            {sections.map(section => (
              <Collapsible 
                key={section.id}
                open={expandedSections.includes(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between text-left h-auto py-2">
                    <span className="text-sm font-medium">{section.title}</span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2 pb-2 space-y-2">
                  {section.id === 'hero' && editedContent.hero && (
                    <>
                      <div>
                        <label className="text-xs text-muted-foreground">Headline</label>
                        <Textarea
                          value={getText(editedContent.hero.headline)}
                          onChange={(e) => updateSectionContent('hero.headline', e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Subheadline</label>
                        <Textarea
                          value={getText(editedContent.hero.subheadline)}
                          onChange={(e) => updateSectionContent('hero.subheadline', e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Primary CTA</label>
                        <Input
                          value={getText(editedContent.hero.primaryCta)}
                          onChange={(e) => updateSectionContent('hero.primaryCta', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </>
                  )}
                  {section.id === 'coursePurpose' && editedContent.coursePurpose && (
                    <>
                      <div>
                        <label className="text-xs text-muted-foreground">Title</label>
                        <Input
                          value={getText(editedContent.coursePurpose.title)}
                          onChange={(e) => updateSectionContent('coursePurpose.title', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Problem</label>
                        <Textarea
                          value={getText(editedContent.coursePurpose.problem)}
                          onChange={(e) => updateSectionContent('coursePurpose.problem', e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Solution</label>
                        <Textarea
                          value={getText(editedContent.coursePurpose.solution)}
                          onChange={(e) => updateSectionContent('coursePurpose.solution', e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                    </>
                  )}
                  {section.id === 'finalCta' && editedContent.finalCta && (
                    <>
                      <div>
                        <label className="text-xs text-muted-foreground">Headline</label>
                        <Input
                          value={getText(editedContent.finalCta.headline)}
                          onChange={(e) => updateSectionContent('finalCta.headline', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Paragraph</label>
                        <Textarea
                          value={getText(editedContent.finalCta.paragraph)}
                          onChange={(e) => updateSectionContent('finalCta.paragraph', e.target.value)}
                          className="text-sm"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Button Text</label>
                        <Input
                          value={getText(editedContent.finalCta.buttonText)}
                          onChange={(e) => updateSectionContent('finalCta.buttonText', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Preview Area */}
          <div className="flex-1 overflow-y-auto bg-background">
            <div className={`mx-auto transition-all ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'}`}>
              {/* Hero Section */}
              {editedContent.hero && (
                <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 px-6">
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    {formData.limitedSeatsBadge && (
                      <Badge className="bg-destructive text-destructive-foreground animate-pulse">
                        {getText(editedContent.hero.urgencyBadge) || 'Limited Seats Available!'}
                      </Badge>
                    )}
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
                      {getText(editedContent.hero.headline)}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                      {getText(editedContent.hero.subheadline)}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button size="lg" className="w-full sm:w-auto">
                        {getText(editedContent.hero.primaryCta)}
                      </Button>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        {getText(editedContent.hero.secondaryCta)}
                      </Button>
                    </div>
                  </div>
                </section>
              )}

              {/* Course Purpose */}
              {editedContent.coursePurpose && (
                <section className="py-12 px-6 bg-muted/30">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.coursePurpose.title)}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-destructive/10 p-6 rounded-xl">
                        <h3 className="font-semibold text-destructive mb-2">The Problem</h3>
                        <p className="text-sm">{getText(editedContent.coursePurpose.problem)}</p>
                      </div>
                      <div className="bg-yellow-500/10 p-6 rounded-xl">
                        <h3 className="font-semibold text-yellow-600 mb-2">The Gap</h3>
                        <p className="text-sm">{getText(editedContent.coursePurpose.gap)}</p>
                      </div>
                      <div className="bg-primary/10 p-6 rounded-xl">
                        <h3 className="font-semibold text-primary mb-2">The Solution</h3>
                        <p className="text-sm">{getText(editedContent.coursePurpose.solution)}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Who Should Join */}
              {editedContent.whoShouldJoin && (
                <section className="py-12 px-6">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.whoShouldJoin.title)}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {editedContent.whoShouldJoin.cards?.map((card: any, index: number) => (
                        <div key={index} className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                          <h3 className="font-semibold text-lg mb-2">{getText(card.audience)}</h3>
                          <p className="text-sm text-muted-foreground">{getText(card.description)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* What You Will Learn */}
              {editedContent.whatYouWillLearn && (
                <section className="py-12 px-6 bg-muted/30">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.whatYouWillLearn.title)}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {editedContent.whatYouWillLearn.modules?.map((module: any, index: number) => (
                        <div key={index} className="bg-card border rounded-xl p-6">
                          <h3 className="font-semibold text-lg mb-3">
                            Module {index + 1}: {getText(module.title)}
                          </h3>
                          <ul className="space-y-2">
                            {module.benefits?.map((benefit: any, bIndex: number) => (
                              <li key={bIndex} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{getText(benefit)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Course Structure */}
              {editedContent.courseStructure && (
                <section className="py-12 px-6">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.courseStructure.title)}
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {['duration', 'weeklyFormat', 'mode', 'language', 'certificate'].map(key => (
                        editedContent.courseStructure[key] && (
                          <div key={key} className="bg-card border rounded-xl p-4 text-center">
                            <p className="text-xs text-muted-foreground capitalize mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="font-semibold">{getText(editedContent.courseStructure[key])}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Pricing */}
              {editedContent.pricing && (
                <section className="py-12 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.pricing.title)}
                    </h2>
                    <div className={`grid gap-6 ${formData.batches.length === 1 ? 'max-w-md mx-auto' : formData.batches.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                      {formData.batches.map((batch: any, index: number) => (
                        <div 
                          key={index} 
                          className={`bg-card border-2 rounded-2xl p-6 text-center relative ${
                            batch.isHighlighted ? 'border-primary shadow-lg scale-105' : 'border-border'
                          }`}
                        >
                          {batch.isHighlighted && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                              Recommended
                            </Badge>
                          )}
                          <h3 className="font-semibold text-lg mb-2">{batch.name}</h3>
                          <p className="text-3xl font-bold text-primary mb-2">₹{batch.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground mb-4">{batch.size} seats per batch</p>
                          <Button className="w-full" variant={batch.isHighlighted ? 'default' : 'outline'}>
                            Enroll Now
                          </Button>
                        </div>
                      ))}
                    </div>
                    {formData.scholarshipAvailable && (
                      <p className="text-center text-sm text-muted-foreground">
                        {getText(editedContent.pricing.scholarshipNote)}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {/* Why Choose Us */}
              {editedContent.whyChooseUs && (
                <section className="py-12 px-6">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.whyChooseUs.title)}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {editedContent.whyChooseUs.points?.map((point: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-card border rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{getText(point.title)}</h3>
                            <p className="text-sm text-muted-foreground">{getText(point.description)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* FAQs */}
              {editedContent.faqs && (
                <section className="py-12 px-6 bg-muted/30">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-center">
                      {getText(editedContent.faqs.title)}
                    </h2>
                    <div className="space-y-3">
                      {editedContent.faqs.questions?.map((faq: any, index: number) => (
                        <div key={index} className="bg-card border rounded-xl p-4">
                          <h3 className="font-semibold mb-2">{getText(faq.question)}</h3>
                          <p className="text-sm text-muted-foreground">{getText(faq.answer)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Final CTA */}
              {editedContent.finalCta && (
                <section className="py-16 px-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="font-heading text-2xl md:text-4xl font-bold">
                      {getText(editedContent.finalCta.headline)}
                    </h2>
                    <p className="text-lg opacity-90">
                      {getText(editedContent.finalCta.paragraph)}
                    </p>
                    <Button size="lg" variant="secondary" className="text-lg px-8">
                      {getText(editedContent.finalCta.buttonText)}
                    </Button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AILandingPagePreview;
