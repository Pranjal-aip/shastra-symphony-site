import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 lotus-underline inline-block pb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
