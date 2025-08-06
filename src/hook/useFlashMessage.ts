import { create } from "zustand";

export type UseFlashMessage = {
    flashMessage: string,
    isOn: boolean,
    setFlashMessage: (message: string) => void 
    setSwitchFlashMessage: (value: boolean) => void
}

const useFlashMessage = create<UseFlashMessage>((set) => ({
    flashMessage: '',
    isOn: false,
    setFlashMessage: (message: string) => {
        set({ flashMessage: message })
    },
    setSwitchFlashMessage: (value: boolean) => {
        set({ isOn: value })
    }
}))

export default useFlashMessage