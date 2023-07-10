import { create } from 'zustand';

export type NavBarStoreType = {
  anchorElUser: HTMLElement | null;
  setAnchorElUser: (el: HTMLElement | null) => void;
};

export const useNavBarStore = create<NavBarStoreType>(set => ({
  anchorElUser: null,
  setAnchorElUser: (el: HTMLElement | null) => set({ anchorElUser: el }),
}));
