import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData = {
  email?: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type UserState = {
  user: UserData;
  setData: (data: any) => any;
};

const initialState = {
  user: {
    email: "",
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    scope: "",
    token_type: "",
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setData: (data: UserData) =>
        set((state: any) => ({ ...state, user: data })),
    }),
    {
      name: "user",
    }
  )
);
