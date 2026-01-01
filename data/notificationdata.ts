import { NotificationItemProps } from '@/components/notification/NotificaitonItem';

export type NotificationEntry = NotificationItemProps & { id: string };

export const notificationData: NotificationEntry[] = [
  {
    id: '1',
    title: 'Payment received',
    description: 'NPR 65,000 was released to your wallet for Batch B09.',
    type: 'payment',
    timestamp: 'Today - 10:30 AM',
    status: 'new',
    meta: '+ NPR 65,000',
  },
  {
    id: '2',
    title: 'Feed stock is low',
    description: 'Layer feed will run out in about 2 days. Reorder soon to avoid shortages.',
    type: 'lowStock',
    timestamp: 'Today - 9:10 AM',
    status: 'new',
  },
  {
    id: '3',
    title: 'Rate update',
    description: 'Market rate increased by 3.5% this morning. Review your pricing.',
    type: 'rateUpdate',
    timestamp: 'Yesterday - 5:45 PM',
    meta: '+3.5% change',
  },
  {
    id: '4',
    title: 'Mortality reminder',
    description: "Log this week's mortality for Batch A12 to keep reports accurate.",
    type: 'reminder',
    timestamp: 'Yesterday - 2:05 PM',
  },
  {
    id: '5',
    title: 'Payment released',
    description: 'Settlement for Batch C14 is ready. Transfer to bank anytime.',
    type: 'payment',
    timestamp: '2 days ago',
    meta: 'Settlement ready',
  },
];
