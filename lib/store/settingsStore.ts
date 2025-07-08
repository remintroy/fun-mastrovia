import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingsPermissions {
  allowAudio: boolean;
  allowVibrate: boolean;
}

export interface SettingsState {
  permissions: SettingsPermissions;
  setPermissions: (key: keyof SettingsPermissions, value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      permissions: {
        allowAudio: true,
        allowVibrate: true,
      },
      setPermissions: (key, value) =>
        set((state) => ({
          permissions: { ...state.permissions, [key]: value },
        })),
    }),
    {
      name: "settings-storage", // unique name for the storage
    }
  )
);

export default useSettingsStore;
