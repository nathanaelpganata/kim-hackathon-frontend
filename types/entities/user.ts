export type AuthStoreType = {
  isAuth: boolean;
  userId: string;
  name: string;
  email: string;
  setIsAuth: (isAuth: boolean) => void;
  setUserId: (userId: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  logout: () => void;
};
