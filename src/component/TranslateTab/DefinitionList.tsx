export default function DefinitionList({ results }: { results: string[] }) {
  const fixString = (str: string) => {
    let ret = str.replaceAll(',', ', ')
    return ret
  }

  return (
    <ul className='list-decimal ml-5'>
      {results.map((result, index) => (
        <li key={index}> {fixString(result)} </li>
      ))}
    </ul>
  )
}
