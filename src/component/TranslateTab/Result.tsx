import { useContext, useEffect, useState } from 'react'
import { ResultContext } from '../context/resultProvider'
import { ResultClass } from '../type/typeDefi'
import DefinitionList from './DefinitionList'
import ReadingKana from './ReadingKana'
import ResultMonoLang from './ResultMonoLang'

export default function Result({ searchStatus }: { searchStatus: boolean }) {
  const { result } = useContext<any>(ResultContext)
  const [formatResult, setFormatResult] = useState(new ResultClass(result))

  useEffect(() => {
    let newResult = new ResultClass(result)
    setFormatResult(newResult)
  }, [result])

  return (
    <div className={`h-50 ${result === null ? 'text-center flex justify-center items-center' : ''} overflow-auto`}>
      {searchStatus && <p>Searching...</p>}
      {formatResult.answer !== null && !searchStatus && formatResult.status ? (
        <>
          {formatResult.answer.map((item: any, index: number) => (
            <div key={index}>
              <h1 className='font-bold'>English Definition {index + 1}</h1>
              <div className='mb-2 ml-5'>
                <ReadingKana results={item} />
                <DefinitionList results={item} />
              </div>
            </div>
          ))}
          <h1 className='font-bold'>Japanese Definition</h1>
          <ResultMonoLang realResult={formatResult} />
        </>
      ) : (
        <p className={searchStatus ? 'hidden' : ''}>NO RESULT</p>
      )}
    </div>
  )
}
