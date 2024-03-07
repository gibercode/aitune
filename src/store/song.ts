import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  songs: Array<any>;
  setSongs?: (data: any) => any;
};

const initialState = {
  songs: [],
};

export const useSongStore = create<UserState>()((set) => ({
  ...initialState,
  setSongs: (data: Array<any>) =>
    set((state: UserState) => ({ ...state, songs: data })),
}));
