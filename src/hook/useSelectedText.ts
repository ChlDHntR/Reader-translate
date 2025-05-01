import { create } from 'zustand'

export type UseSelectedText = {
  selectedText: string
  setSelectedText: (text: string) => void
}

const useSelectedText = create<UseSelectedText>((set) => ({
  selectedText: '',
  setSelectedText: (text: string) => set({ selectedText: text }),
}))

export default useSelectedText
