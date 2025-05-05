export default function DefinitionList({ results }: { results: any }) {
  let resultArr = Object.values(results.definition)

  return (
    <ul className='list-disc ml-5'>
      {resultArr.map((result: any, index) => (
        <li key={index}> {result} </li>
      ))}
    </ul>
  )
}
