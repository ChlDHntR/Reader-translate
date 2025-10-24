import useThemeChanger from '../../../hook/useThemeChanger'
import { IoSunny, IoMoon } from 'react-icons/io5'

export default function SlideBtn({renditionRef} : {renditionRef: any}) {
  const { darkTheme, setDarkTheme } = useThemeChanger()

  const handleThemeChange = () => {
    if (!renditionRef.current) return
    setDarkTheme()
  }

  return (
    <div
      className={`flex justify-around rounded-xl w-12 h-6 relative transition-colors ease-in delay-150 ${
        darkTheme ? 'bg-gray-400 text-gray-400' : 'bg-[#1B2B34] text-[#1B2B34]'
      }`}
      onClick={handleThemeChange}
    >
      <div
        className={`absolute w-5 h-5 rounded-xl top-1/2 -translate-y-1/2 ${
          darkTheme ? 'right-[2px] bg-[#1B2B34]' : 'left-[2px] bg-gray-400'
        }`}
      ></div>
      <div className='z-10 flex flex-col justify-center'>
        <IoSunny />
      </div>
      <div className='z-10 flex flex-col justify-center'>
        <IoMoon />
      </div>
    </div>
  )
}
