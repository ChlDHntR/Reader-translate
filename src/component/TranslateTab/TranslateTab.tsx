import { useRef, useContext, useState, useEffect } from 'react'
import Result from './Result'
import axios from 'axios'
import { ResultContext } from '../context/resultProvider'
import useSelectedText from '../../hook/useSelectedText'
import { BaseUrl } from '../type/BaseUrl'
import useThemeChanger from '../../hook/useThemeChanger'

export default function TranslateTab() {
  const inputTextRef = useRef<HTMLInputElement>(null)
  const { setResult } = useContext<any>(ResultContext)
  const [searchStatus, setSearchStatus] = useState(false)
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)
  const { selectedText } = useSelectedText()
  const [analText, setAnalText] = useState<any>({ analyze: [] })
  const analIndexRef = useRef<number>(0)
  const { darkTheme } = useThemeChanger()

  const handleAnalyzeText = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    if (!inputTextRef.current?.value) {
      setAnalText({ analyze: [] })
      setResult(null)
      return
    }
    timeOutRef.current = setTimeout(async () => {
      setSearchStatus(true)
      try {
        const res = await axios.post(`${BaseUrl.returnUrl()}/api/analyze`, {
          content: inputTextRef.current?.value,
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
        //setResult(null)
        //setAnalText({ analyze: [] })
      }
      setSearchStatus(false)
    }, 300)
  }

  useEffect(() => {
    if (inputTextRef.current) {
      inputTextRef.current.value = selectedText
      analIndexRef.current = 0
      handleAnalyzeText()
    }
  }, [selectedText])

  return (
    <>
      <div className={`w-screen p-2 flex flex-col ${darkTheme ? 'bg-[#393E46]' : 'bg-gray-100'}`}>
        <input
          ref={inputTextRef}
          contentEditable='true'
          className='text-lg bg-white border border-black rounded-md pl-0.5 text-black'
          onChange={handleAnalyzeText}
        ></input>
        <div className='mt-1 h-7 text-nowrap'>
          {analText.analyze.map((item: any, index: number) => (
            <p
              className={`bg-green-600 rounded-2xl pl-1 pr-0.5 mr-0.5 pb-0.5 pt-0.5 inline ${
                index === analIndexRef.current ? 'text-white' : ''
              }`}
              key={index}
              onClick={() => {
                if (analIndexRef.current === index) return
                analIndexRef.current = index
                setResult(analText.runReader[index])
              }}
            >
              {item.surface_form}{' '}
            </p>
          ))}
        </div>
        <Result searchStatus={searchStatus} />
      </div>
    </>
  )
}
