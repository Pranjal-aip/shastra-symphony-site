import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, Check } from 'lucide-react';

interface ProblemSolutionCardProps {
  type: 'problem' | 'solution';
  title: string;
  points: string[];
}

export const ProblemSolutionCard: React.FC<ProblemSolutionCardProps> = ({
  type,
  title,
  points,
}) => {
  const isProblem = type === 'problem';

  return (
    <Card
      className={`overflow-hidden h-full ${
        isProblem
          ? 'bg-muted/50 border-border'
          : 'bg-primary text-primary-foreground border-primary'
      }`}
    >
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isProblem
                ? 'bg-destructive/10 text-destructive'
                : 'bg-accent text-accent-foreground'
            }`}
          >
            {isProblem ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold">{title}</h3>
        </div>

        <ul className="space-y-4">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  isProblem ? 'bg-destructive/50' : 'bg-accent'
                }`}
              />
              <span
                className={`font-body ${
                  isProblem ? 'text-muted-foreground' : 'text-primary-foreground/90'
                }`}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
