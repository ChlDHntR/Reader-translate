import { Result } from '../type/typeDefi'

export default function ReadingKana({ results }: { results: Result }) {
  let resultArr = results.kanaReading

  return (
    <ul className='list-decimal ml-5'>
      {resultArr.map((result, index) => (
        <li key={index}> {result} </li>
      ))}
    </ul>
  )
}
