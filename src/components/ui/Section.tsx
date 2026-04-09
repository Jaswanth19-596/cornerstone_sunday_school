import { forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, size = 'md', children, ...props }, ref) => {
    const sizes = {
      sm: 'py-12',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-28',
      xl: 'py-24 md:py-32',
    };

    return (
      <section ref={ref} className={classNames(sizes[size], className)} {...props}>
        {container ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
