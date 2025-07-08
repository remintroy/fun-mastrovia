import { create } from "zustand";

export interface SettingsPermissions {
  allowAudio: boolean;
  allowVibrate: boolean;
}

export interface SettingsState {
  permissions: SettingsPermissions;
  setPermissions: (key: keyof SettingsPermissions, value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  permissions: {
    allowAudio: true,
    allowVibrate: true,
  },
  setPermissions: (key, value) =>
    set((state) => ({
      permissions: { ...state.permissions, [key]: value },
    })),
}));

export default useSettingsStore;
