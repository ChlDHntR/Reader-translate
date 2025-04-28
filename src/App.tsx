import { useState, useRef, useEffect } from 'react'
import { ReactReader } from 'react-reader'
import './App.css'
import axios from 'axios'
import TranslateTab from './component/TranslateTab/TranslateTab'
import ResultProvider from './component/context/resultProvider'
import type { Contents, Rendition, NavItem } from 'epubjs'
import { Result } from './component/type/typeDefi'
import PageManageTab from './component/PageManageTab/PageMangeTab'

function App() {
  const [location, setLocation] = useState<string | number>(0)
  const [transTabOn, setTransTabOn] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [tabSwitch, setTabSwitch] = useState<number>(0)
  const [pageInfo, setPageInfo] = useState<{
    page: number
    chapter: string | undefined
  }>({ page: 0, chapter: '' })
  const rendition = useRef<Rendition | undefined>(undefined)
  const toc = useRef<NavItem[]>([])

  return (
    <ResultProvider value={{ result, setResult }}>
      <div
        className="oveflow-hidden"
        style={{ height: '100vh', direction: 'ltr' }}
      >
        <div style={{ height: '100vh' }}>
          <ReactReader
            //url="http://192.168.0.102:3003/book1/book2.epub"
            url={'https://react-reader.metabits.no/files/alice.epub'}
            location={location}
            showToc={true}
            tocChanged={(_toc) => {
              toc.current = _toc
              console.log(toc.current)
            }}
            locationChanged={(epubcfi: string) => {
              console.log(location)
              //console.log(rendition.current?.location.start)
              //console.log(toc.current)
              setLocation(epubcfi)
              if (rendition.current && toc.current) {
                const { displayed, href } = rendition.current.location.start
                const chapter = toc.current.find((item) => item.href === href)
                setPageInfo({ page: displayed.page, chapter: chapter?.id })
              }
            }}
            getRendition={(_rendition: any) => {
              rendition.current = _rendition
              console.log(rendition.current)
            }}
            isRTL={true}
          />
        </div>
        <div
          id="TranslateTab-container"
          className={
            'z-100 fixed left-0 transition-all delay-200 ' +
            (transTabOn ? ' bottom-0' : ' -bottom-58')
          }
        >
          <div className='flex flex-row'>
            <div
              id="puller"
              className="w-16 h-6 bg-gray-400 rounded-t-lg cursor-pointer ml-1 text-sm text-center"
              onClick={() => {
                setTabSwitch(0)
                setTransTabOn(!transTabOn)
              }}
            >
              {transTabOn ? 'DOWN' : 'UP'}
            </div>
            <div
              id="puller2"
              className="w-16 h-6 bg-gray-400 rounded-t-lg cursor-pointer ml-1 text-sm text-center"
              onClick={() => {
                setTabSwitch(prev => prev === 0 ? 1 : 0)
              }}
            ></div>
          </div>
          {tabSwitch === 0 ? (
            <TranslateTab />
          ) : (
            <PageManageTab pageInfo={pageInfo} />
          )}
        </div>
      </div>
    </ResultProvider>
  )
}

export default App
