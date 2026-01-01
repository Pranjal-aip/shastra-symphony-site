import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RoadmapItem {
  month: string;
  title: string;
  description: string;
}

interface RoadmapTimelineProps {
  items: RoadmapItem[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2" />

      <div className="space-y-8 md:space-y-12">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
              idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg transform -translate-x-1/2 z-10" />

            {/* Content */}
            <div
              className={`ml-12 md:ml-0 md:w-1/2 ${
                idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}
            >
              <Badge className="mb-2 bg-accent/10 text-accent border-accent/20 font-semibold">
                {item.month}
              </Badge>
              <h4 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">
                {item.title}
              </h4>
              <p className="font-body text-muted-foreground text-sm md:text-base">
                {item.description}
              </p>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};
