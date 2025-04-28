import { useRef, useContext, useState } from 'react'
import Result from './Result'
import axios from 'axios'
import { ResultContext } from '../context/resultProvider'

export default function TranslateTab() {
  const inputTextRef = useRef<HTMLInputElement>(null)
  const { setResult } = useContext<any>(ResultContext)
  const [searchStatus, setSearchStatus] = useState(false)

  const handleSearch = () => {
    if (!inputTextRef.current?.value) {
      return
    }
    setSearchStatus(true)
    axios
      .post('http://192.168.0.102:3003/api/search', { content: inputTextRef.current?.value })
      .then((res) => {
        setSearchStatus(false)
        if (typeof res.data == 'string') {
          setResult(null)
          return
        }
        setResult(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <div className='bg-gray-100 w-screen p-2'>
        <div>
          <input type='text bg-black' className='outline mr-3 bg-white rounded-md text-lg' ref={inputTextRef} />
          <button className='border rounded-md italic pl-1 pr-1 text-lg text-center' onClick={() => handleSearch()}>
            search
          </button>
        </div>
        <Result searchStatus={searchStatus} />
      </div>
    </>
  )
}
