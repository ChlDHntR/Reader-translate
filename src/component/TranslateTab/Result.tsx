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
          <h2 className='font-bold'>Kana: </h2>
          <ReadingKana results={result} />
          <h2 className='font-bold'>Definition: </h2>
          <DefinitionList results={result} />
        </>
      ) : (
        <p className={searchStatus ? 'hidden' : ''}>NO RESULT</p>
      )}
    </div>
  )
}
