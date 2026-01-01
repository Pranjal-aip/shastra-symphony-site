import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  benefit: string;
  color: 'madder' | 'gold';
}

export const PillarCard: React.FC<PillarCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  benefit,
  color,
}) => {
  const colorClasses = {
    madder: 'bg-primary text-primary-foreground',
    gold: 'bg-accent text-accent-foreground',
  };

  return (
    <Card className="group hover-lift border-border/50 bg-card overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div
          className={`w-14 h-14 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-7 w-7" />
        </div>
        
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
          {title}
        </h3>
        
        <p className="font-body text-sm text-muted-foreground mb-4">
          {subtitle}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border">
          <p className="font-body text-sm font-medium text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {benefit}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
