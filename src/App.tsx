import { useState, useRef, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import TranslateTab from './component/TranslateTab/TranslateTab'
import ResultProvider from './component/context/resultProvider'
import type { Contents, Rendition, NavItem } from 'epubjs'
import { Result } from './component/type/typeDefi'
import PageManageTab from './component/PageManageTab/PageMangeTab'
import 'regenerator-runtime'
import EPUBviewer from './component/EPUBviewer/EPUBviewer'
import useSelectedText from './hook/useSelectedText'

function App() {
  const [location, setLocation] = useState<string>('')
  const [transTabOn, setTransTabOn] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [tabSwitch, setTabSwitch] = useState<number>(0)
  const [pageInfo, setPageInfo] = useState<{
    page: number
    chapter: string | undefined
  }>({ page: 0, chapter: '' })
  const { selectedText } = useSelectedText()

  useEffect(() => {
    if (selectedText.length > 0) {
      setTransTabOn(true)
    }
  }, [selectedText])

  return (
    <ResultProvider value={{ result, setResult }}>
      <div className='oveflow-hidden' style={{ height: '100vh', direction: 'ltr' }}>
        <div style={{ height: '100vh' }}>
          <div className='relative h-94/100 overflow-hidden '>
            {/* <ReactEpubViewer
              url={'http://192.168.0.101:3003/book1/makeine4.epub'}
              ref={viewerRef}
              viewerLayout={{
                VIEWER_HEADER_HEIGHT: 0,
                VIEWER_FOOTER_HEIGHT: 400,
                MIN_VIEWER_WIDTH: 0,
                MIN_VIEWER_HEIGHT: 0,
              }}
              onPageChange={(page) => {
                console.log(page)
                return
              }}
            /> */}
            <EPUBviewer url='https://dictionary-api-server.onrender.com/book1/makeine4_2.epub' />
          </div>
        </div>
        <div
          id='TranslateTab-container'
          className={'z-100 fixed left-0 transition-all ' + (transTabOn ? ' bottom-0' : ' -bottom-61')}
        >
          <div className='flex flex-row'>
            <div
              id='puller'
              className='w-16 h-6 bg-gray-400 rounded-t-lg cursor-pointer ml-1 text-sm text-center'
              onClick={() => {
                setTabSwitch(0)
                setTransTabOn(!transTabOn)
              }}
            >
              {transTabOn ? 'DOWN' : 'UP'}
            </div>
            <div
              id='puller2'
              className='w-16 h-6 bg-gray-400 rounded-t-lg cursor-pointer ml-1 text-sm text-center hidden'
              onClick={() => {
                setTabSwitch((prev) => (prev === 0 ? 1 : 0))
              }}
            ></div>
          </div>
          {tabSwitch === 0 ? <TranslateTab /> : <PageManageTab pageInfo={pageInfo} />}
        </div>
      </div>
    </ResultProvider>
  )
}

export default App
