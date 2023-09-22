import {
  createSelectorHooks,
  ZustandHookSelectors,
} from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OrderStoreType } from '@/types/entities/order';

const useOrderStoreBase = create<OrderStoreType>()(
  persist(
    (set) => ({
      biodata: {
        customer_name: '',
        phone: '',
        picture: [],
      },
      payment: {
        atas_nama: '',
        bank_id: '',
        bukti_bayar: [],
      },
      setBiodata: (data) =>
        set(
          produce<OrderStoreType>((state) => {
            state.biodata = data = { ...state.biodata, ...data };
          })
        ),
      setPayment: (data) =>
        set(
          produce<OrderStoreType>((state) => {
            state.payment = data = { ...state.payment, ...data };
          })
        ),
    }),
    { name: 'orderStore' }
  )
);

const useOrderStore = createSelectorHooks(
  useOrderStoreBase
) as typeof useOrderStoreBase & ZustandHookSelectors<OrderStoreType>;

export default useOrderStore;
