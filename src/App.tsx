import { useState, useRef, useEffect } from 'react'
import { ReactReader } from 'react-reader'
import './App.css'
import axios from 'axios'
import TranslateTab from './component/TranslateTab/TranslateTab'
import ResultProvider from './component/context/resultProvider'
import type { Contents, Rendition } from 'epubjs'

function App() {
  const [location, setLocation] = useState<string | number>(0)
  const [transTabOn, setTransTabOn] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const rendition = useRef<Rendition | undefined>(undefined)

  return (
    <ResultProvider value={{ result, setResult }}>
      <div className='oveflow-hidden' style={{ height: '100vh', direction: 'ltr' }}>
        <div style={{ height: '100vh' }}>
          <ReactReader
            url='http://192.168.0.102:3003/book1/book2.epub'
            location={location}
            locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            getRendition={(_rendition: any) => {
              rendition.current = _rendition
              rendition.current!.direction('ltr')
            }}
            isRTL={true}
          />
        </div>
        <TranslateTab transTabOn={transTabOn} setTransTabOn={setTransTabOn} />
      </div>
    </ResultProvider>
  )
}

export default App
