import { useEffect } from 'react'
import useFlashMessage from '../../hook/useFlashMessage'

export default function FlashMessage() {
  const { flashMessage, isOn, setSwitchFlashMessage } = useFlashMessage()

  useEffect(() => {
    const messageAlert = () => {
      setTimeout(() => {
        setSwitchFlashMessage(false)
      }, 2000)
    }

    if (flashMessage.length > 0 && isOn) {
      messageAlert()
    }
  }, [isOn])

  return (
    <div>
      <div
        className={`w-50 bg-green-400 text-white rounded-2xl fixed z-100 transition-all delay-300 left-1/2 -translate-x-1/2 text-center ${
          isOn ? 'opacity-100 top-13' : 'opacity-100 -top-13'
        }`}
      >
        <p className="text-base p-[5px]">{flashMessage}</p>
      </div>
    </div>
  )
}
