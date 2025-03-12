export type NotificationDataType = {
  data: NotificationType[];
};

export type NotificationType = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  data: {
    product_id: string;
  };
};