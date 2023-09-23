import {
  createSelectorHooks,
  ZustandHookSelectors,
} from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  CategoryEnum,
  OrderStoreType,
  PaymentMethodEnum,
} from '@/types/entities/order';

const useOrderStoreBase = create<OrderStoreType>()(
  persist(
    (set) => ({
      category: {
        category: CategoryEnum.boneka,
      },
      user: {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        organization_name: '',
        organization_website: '',
      },
      item: {
        description: '',
        quantity: 0,
        width: 0,
        height: 0,
        length: 0,
        deadline: new Date(),
        payment_method: PaymentMethodEnum.dp,
        design_img: [],
      },
      setCategory: (data) =>
        set(
          produce<OrderStoreType>((state) => {
            state.category = data = { ...state.category, ...data };
          })
        ),
      setUser: (data) =>
        set(
          produce<OrderStoreType>((state) => {
            state.user = data = { ...state.user, ...data };
          })
        ),
      setItem: (data) =>
        set(
          produce<OrderStoreType>((state) => {
            state.item = data = { ...state.item, ...data };
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
