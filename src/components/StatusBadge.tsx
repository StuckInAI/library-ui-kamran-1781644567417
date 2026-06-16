import type { ReadingStatus } from '@/types';
import clsx from 'clsx';

type StatusBadgeProps = {
  status: ReadingStatus;
};

const statusConfig: Record<ReadingStatus, { label: string; className: string }> = {
  reading: { label: 'Reading', className: 'bg-blue-100 text-blue-700' },
  'want-to-read': { label: 'Want to Read', className: 'bg-purple-100 text-purple-700' },
  read: { label: 'Finished', className: 'bg-green-100 text-green-700' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={clsx('inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full', config.className)}>
      {config.label}
    </span>
  );
}
