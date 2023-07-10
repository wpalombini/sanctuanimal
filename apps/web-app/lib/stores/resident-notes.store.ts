import { create } from 'zustand';

type ResidentNotesStore = {
  editGeneralNotes: boolean;
  setEditGeneralNotes: (value: boolean) => void;
};

export const useResidentNotesStore = create<ResidentNotesStore>(set => ({
  editGeneralNotes: false,
  setEditGeneralNotes: (value: boolean) => set({ editGeneralNotes: value }),
}));
