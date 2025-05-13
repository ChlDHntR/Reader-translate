export default function ReadingKana({ results }: { results: any }) {
  const result = results.kanaReading
  const kanjiResult: string = results.kanjiWriting?.toString().replaceAll(',', ', ')
  console.log(kanjiResult)

  return <p className='ml-0'>kana: "{result}" <br/> kanji: "{kanjiResult}"</p>
}
