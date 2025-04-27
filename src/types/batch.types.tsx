export type BatchType = {
  data: {
    id: string;
    barcode: string;
    expiration_date: string;
    sold_out: boolean;
    created_at: string;
  }[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export type BatchFormType = {
  barcode: string;
  expiration_date: string;
  sold_out: boolean;
}