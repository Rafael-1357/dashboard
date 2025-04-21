export type NotificationType = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  data: {
    product_id: string;
  };
};

export type MetaLinks = {
  url: string | null,
  label: string,
  active: boolean
};

export type NotificationMeta = {
  current_page: number,
  from: number,
  last_page: number,
  links: MetaLinks[],
  path: string,
  per_page: number,
  to: number,
  total: number
};