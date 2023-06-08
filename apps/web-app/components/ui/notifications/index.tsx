import { Alert, Snackbar } from '@sanctuanimal/ui';

import { useNotificationStore } from '@/lib/stores';

export const Notifications = () => {
  const { notification, setNotification } = useNotificationStore();

  return (
    <Snackbar
      autoHideDuration={5000}
      open={notification !== null}
      onClose={() => setNotification(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {notification ? (
        <Alert onClose={() => setNotification(null)} severity={notification.type}>
          {notification.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};
