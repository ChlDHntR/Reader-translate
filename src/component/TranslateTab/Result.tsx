import { useContext } from 'react'
import { ResultContext } from '../context/resultProvider'
import DefinitionList from './DefinitionList'
import ReadingKana from './ReadingKana'

export default function Result({ searchStatus }: { searchStatus: boolean }) {
  const { result } = useContext<any>(ResultContext)

  return (
    <div className={`h-50 ${result === null ? 'text-center flex justify-center items-center' : ''} overflow-auto`}>
      {searchStatus && <p>Searching...</p>}
      {result !== null && !searchStatus ? (
        <>
          {result.answer.map((item: any, index: number) => (
            <div key={index}>
              <h1 className='font-bold'>Definition {index + 1}</h1>
              <div className='mb-2 ml-5'>
                <ReadingKana results={item} />
                <DefinitionList results={item} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className={searchStatus ? 'hidden' : ''}>NO RESULT</p>
      )}
    </div>
  )
}
