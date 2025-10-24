import { useState, useEffect } from 'react'
import './App.css'
import TranslateTab from './component/TranslateTab/TranslateTab'
import ResultProvider from './component/context/resultProvider'
import EPUBviewer from './component/EPUBviewer/EPUBviewer'
import ThemeWrapper from './component/UI/ThemeWrapper'
import useSelectedText from './hook/useSelectedText'
import { useParams } from 'react-router'
import { BaseUrl } from './component/type/BaseUrl'
import FlashMessage from './component/FlashMessage/FlashMessage'
import ErrorBoundary from './component/errorBoundary/ErrorBoundary'

function ReaderIndex() {
  const [transTabOn, setTransTabOn] = useState(false)
  const [autoPull, setAutoPull] = useState(true)
  const [result, setResult] = useState<any>(null)
  const { selectedText } = useSelectedText()
  const { bookName } = useParams()

  useEffect(() => {
    if (selectedText.length > 0 && autoPull) {
      setTransTabOn(true)
    }
  }, [selectedText])

  return (
    <ResultProvider value={{ result, setResult }}>
      <FlashMessage />
      <ThemeWrapper>
        <div className='oveflow-hidden' style={{ height: '100vh', direction: 'ltr' }}>
          <div style={{ height: '100vh' }}>
            <div className='relative h-full overflow-hidden '>
              <EPUBviewer url={`${BaseUrl.returnUrl()}/book1/${bookName}.epub`} />
            </div>
          </div>
          <div
            id='TranslateTab-container'
            className={'z-100 fixed left-0 transition-all ' + (transTabOn ? ' bottom-0' : ' -bottom-68')}
          >
              <div className='flex flex-row'>
                <div
                  id='puller'
                  className='w-16 h-6 bg-blue-500 rounded-t-lg cursor-pointer ml-1 text-sm text-center text-white'
                  onClick={() => {
                    setTransTabOn(!transTabOn)
                  }}
                >
                  {transTabOn ? 'DOWN' : 'UP'}
                </div>
                <div
                  className={`w-16 h-6 bg-blue-500 rounded-t-lg cursor-pointer ml-1 text-sm text-center ${
                    autoPull ? 'text-green-400' : 'text-red-500'
                  }`}
                  onClick={() => {
                    setAutoPull(!autoPull)
                  }}
                >
                  {autoPull ? 'On' : 'Off'}
                </div>
              </div>
              <ErrorBoundary fallback={'unknown error'}>
                <TranslateTab />
              </ErrorBoundary>
            </div>
          </div>
      </ThemeWrapper>
    </ResultProvider>
  )
}

export default ReaderIndex
