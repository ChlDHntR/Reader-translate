import { useState, useEffect } from 'react'
import './App.css'
import TranslateTab from './component/TranslateTab/TranslateTab'
import ResultProvider from './component/context/resultProvider'
import 'regenerator-runtime'
import EPUBviewer from './component/EPUBviewer/EPUBviewer'
import useSelectedText from './hook/useSelectedText'
import { useParams } from 'react-router'

function ReaderIndex() {
  const [transTabOn, setTransTabOn] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { selectedText } = useSelectedText()
  const { bookName } = useParams()

  useEffect(() => {
    if (selectedText.length > 0) {
      setTransTabOn(true)
    }
  }, [selectedText])

  return (
    <ResultProvider value={{ result, setResult }}>
      <div className='oveflow-hidden' style={{ height: '100vh', direction: 'ltr' }}>
        <div style={{ height: '100vh' }}>
          <div className='relative h-full overflow-hidden '>
            <EPUBviewer url={`https://dictionary-api-server.onrender.com/book1/${bookName}.epub`} />
          </div>
        </div>
        <div
          id='TranslateTab-container'
          className={'z-100 fixed left-0 transition-all ' + (transTabOn ? ' bottom-0' : ' -bottom-68')}
        >
          <div className='flex flex-row'>
            <div
              id='puller'
              className='w-16 h-6 bg-gray-400 rounded-t-lg cursor-pointer ml-1 text-sm text-center'
              onClick={() => {
                setTransTabOn(!transTabOn)
              }}
            >
              {transTabOn ? 'DOWN' : 'UP'}
            </div>
          </div>
          <TranslateTab />
        </div>
      </div>
    </ResultProvider>
  )
}

export default ReaderIndex
