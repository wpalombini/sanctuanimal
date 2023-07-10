import { create } from 'zustand';

import { Notification } from '../types';

type NotificationStore = {
  notification: Notification | null;
  setNotification: (n: Notification | null) => void;
};

export const useNotificationStore = create<NotificationStore>(set => ({
  notification: null,
  setNotification: (notificationObj: Notification | null) => set({ notification: notificationObj }),
}));
