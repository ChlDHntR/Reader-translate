import { Result } from '../type/typeDefi'

export default function ReadingKana({ results }: { results: Result }) {
  let result = results.kanaReading

  return <p className='ml-5'>{result}</p>
}
