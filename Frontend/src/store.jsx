import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useStore;
