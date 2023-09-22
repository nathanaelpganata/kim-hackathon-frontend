type setBiodataType = {
  customer_name: String;
  phone: String;
  picture: String[];
};

type setPaymentType = {
  atas_nama: String;
  bank_id: String;
  bukti_bayar: String[];
};

export type OrderStoreType = {
  biodata: setBiodataType;
  payment: setPaymentType;
  setBiodata: (data: setBiodataType) => void;
  setPayment: (data: setPaymentType) => void;
};
