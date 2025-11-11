// src/data/notificationsData.ts
export interface Notification {
  id: number;
  user: string;
  username: string;
  action: string;
  time: string;
  avatar: string;
  section: 'Today' | 'Yesterday' | 'This week';
}

export const notificationsData: Notification[] = [
  {
    id: 1,
    user: 'Juan Pérez, Ana Martínez',
    username: '@juan.perez01, @ana.mtz_',
    action: 'and others liked your post',
    time: 'Today',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    section: 'Today',
  },
  {
    id: 2,
    user: 'María Gómez',
    username: '@maria_gmz',
    action: 'started to follow you',
    time: 'Today',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    section: 'Today',
  },
  {
    id: 3,
    user: 'Carlos Rodríguez',
    username: '@carlos.rodz',
    action: 'added your post to favourites',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    section: 'Yesterday',
  },
  {
    id: 4,
    user: 'Lorena Gómez',
    username: '@lorena_9',
    action: 'liked your post',
    time: 'This week',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    section: 'This week',
  },
  {
    id: 5,
    user: 'Pedro Silva',
    username: '@pedro.silva',
    action: 'commented on your post',
    time: 'This week',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    section: 'This week',
  },
];