import {
  createSelectorHooks,
  ZustandHookSelectors,
} from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthStoreType } from '@/types/entities/user';

const useAuthStoreBase = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuth: false,
      name: '',
      userId: '',
      email: '',
      setIsAuth: (isAuth: boolean) =>
        set(
          produce((state) => {
            state.isAuth = isAuth;
          })
        ),
      setUserId: (userId: string) =>
        set(
          produce((state) => {
            state.userId = userId;
          })
        ),
      setName: (name: string) =>
        set(
          produce((state) => {
            state.name = name;
          })
        ),
      setEmail: (email: string) =>
        set(
          produce((state) => {
            state.email = email;
          })
        ),
        logout: () =>
        set(
          produce((state) => {
            state.auth = false;
            state.userId = '';
            state.email = '';
            state.name = '';
          })
        ),
    }),
    { name: 'authStore' }
  )
);

const useAuthStore = createSelectorHooks(
  useAuthStoreBase
) as typeof useAuthStoreBase & ZustandHookSelectors<AuthStoreType>;

export default useAuthStore;
