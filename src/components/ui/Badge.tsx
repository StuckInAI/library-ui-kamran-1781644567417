import clsx from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'amber' | 'green' | 'red' | 'purple' | 'blue' | 'gray';
  size?: 'sm' | 'md';
};

const variantStyles = {
  amber: 'bg-amber-100 text-amber-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-600',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export default function Badge({ children, variant = 'gray', size = 'sm' }: BadgeProps) {
  return (
    <span className={clsx('inline-flex items-center font-medium rounded-full', variantStyles[variant], sizeStyles[size])}>
      {children}
    </span>
  );
}
