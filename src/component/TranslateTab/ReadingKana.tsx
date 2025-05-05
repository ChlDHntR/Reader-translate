export default function ReadingKana({ results }: { results: any }) {
  let result = results.kanaReading

  return <p className='ml-0'>"{result}"</p>
}
