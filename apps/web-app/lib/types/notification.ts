export enum NotificationType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export const NotificationSuccess = {
  message: 'Data successfully saved!',
  type: NotificationType.Success,
};

export const NotificationError = {
  message: 'An error occurred.',
  type: NotificationType.Error,
};

export type Notification = {
  message: string;
  type: NotificationType;
};
