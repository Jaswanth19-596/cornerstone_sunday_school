import { classNames } from '../../utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-navy-100 text-navy-800',
    success: 'bg-sage-100 text-sage-800',
    warning: 'bg-gold-100 text-gold-800',
    error: 'bg-terracotta-100 text-terracotta-800',
    info: 'bg-navy-100 text-navy-800',
    primary: 'bg-sage-600 text-white',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
