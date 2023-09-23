export enum CategoryEnum {
  'boneka' = 'boneka',
  'bantal' = 'bantal',
  'lainnya' = 'lainnya',
}
export enum PaymentMethodEnum {
  'dp' = 'dp',
  'angsuran' = 'angsuran',
}

export type setCategoryType = {
  category: CategoryEnum;
};

export type setUserType = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  organization_name?: string;
  organization_website?: string;
};

export type setItemType = {
  description: string;
  quantity: number;
  width: number;
  height: number;
  length: number;
  deadline: Date;
  payment_method: PaymentMethodEnum;
  design_img: string[];
};

export type OrderStoreType = {
  category: setCategoryType;
  user: setUserType;
  item: setItemType;
  setCategory: (data: setCategoryType) => void;
  setUser: (data: setUserType) => void;
  setItem: (data: setItemType) => void;
};
