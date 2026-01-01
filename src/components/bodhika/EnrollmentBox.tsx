import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Gift, Flame, ArrowRight } from 'lucide-react';

interface Bonus {
  title: string;
  value: string;
}

interface EnrollmentBoxProps {
  price: string;
  originalPrice?: string;
  priceSubtext: string;
  ctaText: string;
  onCTAClick: () => void;
  bonuses: Bonus[];
  scarcityText: string;
  features: string[];
}

export const EnrollmentBox: React.FC<EnrollmentBoxProps> = ({
  price,
  originalPrice,
  priceSubtext,
  ctaText,
  onCTAClick,
  bonuses,
  scarcityText,
  features,
}) => {
  return (
    <Card className="border-2 border-accent shadow-elevated overflow-hidden bg-card">
      {/* Scarcity Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Flame className="h-5 w-5 animate-pulse" />
          <span className="font-body font-semibold">{scarcityText}</span>
          <Flame className="h-5 w-5 animate-pulse" />
        </div>
      </div>

      <CardContent className="p-6 md:p-8">
        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-3 mb-2">
            {originalPrice && (
              <span className="text-2xl text-muted-foreground line-through font-body">
                {originalPrice}
              </span>
            )}
            <span className="font-heading text-5xl md:text-6xl font-bold text-primary">
              {price}
            </span>
          </div>
          <p className="font-body text-muted-foreground">{priceSubtext}</p>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-accent" />
              </div>
              <span className="font-body text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Bonuses */}
        {bonuses.length > 0 && (
          <div className="bg-accent/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-accent" />
              <span className="font-heading font-bold text-foreground">Free Bonuses Included</span>
            </div>
            <ul className="space-y-2">
              {bonuses.map((bonus, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">{bonus.title}</span>
                  <Badge variant="secondary" className="font-body text-xs">
                    Worth {bonus.value}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={onCTAClick}
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-center font-body text-xs text-muted-foreground mt-4">
          Secure payment • EMI options available
        </p>
      </CardContent>
    </Card>
  );
};
