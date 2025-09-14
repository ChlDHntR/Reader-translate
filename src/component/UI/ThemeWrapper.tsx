import { ReactNode } from 'react'
import useThemeChanger from '../../hook/useThemeChanger'

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { darkTheme } = useThemeChanger()

  return <div className={`${darkTheme ? 'text-[#80DEEA] bg-[#1B2B34]' : ''}`}>{children}</div>
}
