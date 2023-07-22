import { create } from 'zustand';

type ResidentNotesStore = {
  addHistoricalNote: boolean;
  editGeneralNotes: boolean;
  setAddHistoricalNote: (value: boolean) => void;
  setEditGeneralNotes: (value: boolean) => void;
};

export const useResidentNotesStore = create<ResidentNotesStore>(set => ({
  addHistoricalNote: false,
  setAddHistoricalNote: (value: boolean) => set({ addHistoricalNote: value }),
  editGeneralNotes: false,
  setEditGeneralNotes: (value: boolean) => set({ editGeneralNotes: value }),
}));
