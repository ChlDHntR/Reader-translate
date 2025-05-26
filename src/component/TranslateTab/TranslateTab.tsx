import { useRef, useContext, useState, useEffect } from 'react'
import Result from './Result'
import axios from 'axios'
import { ResultContext } from '../context/resultProvider'
import useSelectedText from '../../hook/useSelectedText'
import ResultMonoLang from './ResultMonoLang'

export default function TranslateTab({ monoLang }: { monoLang: any }) {
  const inputTextRef = useRef<HTMLDivElement>(null)
  const { setResult } = useContext<any>(ResultContext)
  const [searchStatus, setSearchStatus] = useState(false)
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)
  const { selectedText } = useSelectedText()

  // useEffect(() => {
  //   const handleSelectionChange = () => {
  //     const selection = window.getSelection()
  //     const selectedText = selection?.toString() || ''

  //     if (selectedText.length > 0) {
  //       console.log('Selected text:', selectedText)
  //     }
  //   }

  //   const html = document.querySelector('.vrtl') as HTMLHtmlElement
  //   console.log(html)
  //   html.addEventListener('selectionchange', handleSelectionChange)

  //   return () => {
  //     html.removeEventListener('selectionchange', handleSelectionChange)
  //   }
  // }, [])

  const handleSearch = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    if (!inputTextRef.current?.innerText) {
      setResult(null)
      return
    }

    timeOutRef.current = setTimeout(async () => {
      setSearchStatus(true)
      try {
        const res = await axios.post(
          'https://dictionary-api-server.onrender.com/api/search',
          {
            // const res = await axios.post('http://192.168.0.102:3003/api/search', {
            content: inputTextRef.current?.innerText,
          }
        )
        if (res.data === 'no result found') {
          setResult(null)
          setSearchStatus(false)
          return
        }
        setResult(res.data)
      } catch (err) {
        console.error(err)
      }
      setSearchStatus(false)
    }, 300)
  }

  useEffect(() => {
    if (inputTextRef.current) {
      inputTextRef.current.innerText = selectedText
      handleSearch()
    }
  }, [selectedText])

  return (
    <>
      <div className="bg-gray-100 w-screen p-2 flex flex-col">
        <div
          ref={inputTextRef}
          contentEditable="true"
          className="text-lg bg-white border border-black rounded-md pl-0.5"
          onInput={handleSearch}
        ></div>
        {/* <input
          type='text bg-black'
          className='border px-1 border-black bg-white rounded-md text-lg block'
          ref={inputTextRef}
          onChange={handleSearch}
        /> */}
        <Result searchStatus={searchStatus}/>
      </div>
    </>
  )
}
