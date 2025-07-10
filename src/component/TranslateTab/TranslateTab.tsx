import { useRef, useContext, useState, useEffect } from 'react'
import Result from './Result'
import axios from 'axios'
import { ResultContext } from '../context/resultProvider'
import useSelectedText from '../../hook/useSelectedText'
import { BaseUrl } from '../type/BaseUrl'

export default function TranslateTab() {
  const inputTextRef = useRef<HTMLDivElement>(null)
  const { setResult } = useContext<any>(ResultContext)
  const [searchStatus, setSearchStatus] = useState(false)
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)
  const { selectedText } = useSelectedText()
  const [analText, setAnalText] = useState<any>({ analyze: [] })
  const analIndexRef = useRef<number>(0)

  const handleAnalyzeText = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    if (!inputTextRef.current?.innerText) {
      setAnalText({ analyze: [] })
      setResult(null)
      return
    }
    timeOutRef.current = setTimeout(async () => {
      setSearchStatus(true)
      try {
        const res = await axios.post(`${BaseUrl.returnUrl()}/api/analyze`, {
          // const res = await axios.post('http://192.168.0.102:3003/api/search', {
          content: inputTextRef.current?.innerText,
        })
        if (res.data === 'no result found') {
          setResult(null)
          setAnalText({ analyze: [] })
          setSearchStatus(false)
          return
        }
        setAnalText(res.data)
        setResult(res.data.runReader[analIndexRef.current])
      } catch (err) {
        console.error(err)
      }
      setSearchStatus(false)
    }, 300)
  }

  useEffect(() => {
    if (inputTextRef.current) {
      inputTextRef.current.innerText = selectedText
      analIndexRef.current = 0
      handleAnalyzeText()
    }
  }, [selectedText])

  return (
    <>
      <div className='bg-gray-100 w-screen p-2 flex flex-col'>
        <div
          ref={inputTextRef}
          contentEditable='true'
          className='text-lg bg-white border border-black rounded-md pl-0.5'
          onInput={handleAnalyzeText}
        ></div>
        <div className='mt-1 h-7'>
          {analText.analyze.map((item: any, index: number) => (
            <button
              className={`bg-green-600 rounded-2xl pl-1 pr-1 mr-1 ${
                index === analIndexRef.current ? 'text-white' : ''
              }`}
              key={index}
              onClick={() => {
                if (analIndexRef.current === index) return
                analIndexRef.current = index
                setResult(analText.runReader[index])
              }}
            >
              {' '}
              {item.surface_form}{' '}
            </button>
          ))}
        </div>
        <Result searchStatus={searchStatus} />
      </div>
    </>
  )
}
