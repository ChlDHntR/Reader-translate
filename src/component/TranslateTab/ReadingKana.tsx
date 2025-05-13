export default function ReadingKana({ results }: { results: any }) {
  const result = results.kanaReading
  const kanjiResult: string = results.kanjiWriting?.toString().replace(',', ', ')

  return <p className='ml-0'>kana: "{result}"| kanji: "{kanjiResult}"</p>
}
