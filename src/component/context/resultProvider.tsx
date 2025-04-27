import { createContext } from 'react'

export const ResultContext = createContext<any>(null)

export default function ResultProvider({ children, value }: { children: React.ReactNode; value: any }) {
  return <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
}
