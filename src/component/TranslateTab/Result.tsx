import { useContext } from 'react'
import { ResultContext } from '../context/resultProvider'
import DefinitionList from './definitionList'

export default function Result({ searchStatus }: { searchStatus: boolean }) {
  const { result } = useContext<any>(ResultContext)

  return (
    <div
      className={`h-50 w-screen ${
        result === null ? 'text-center flex justify-center items-center' : ''
      } overflow-y-scroll`}
    >
      {searchStatus && <p>Searching...</p>}
      {result !== null && !searchStatus ? (
        <>
          <h2 className='font-bold'>Definition: </h2>
          <DefinitionList results={result} />
        </>
      ) : (
        <p className={searchStatus ? 'hidden' : ''}>NO RESULT</p>
      )}
    </div>
  )
}
