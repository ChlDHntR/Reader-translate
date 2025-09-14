import { create } from 'zustand'

export type useThemeChanger = {
  darkTheme: boolean
  setDarkTheme: () => void
}

const useThemeChanger = create<useThemeChanger>((set) => ({
  darkTheme: false,
  setDarkTheme: () => set((prev) => ({ darkTheme: !prev.darkTheme })),
}))

export default useThemeChanger
