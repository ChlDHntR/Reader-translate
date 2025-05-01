import type { Result } from '../type/typeDefi'

export default function DefinitionList({ results }: { results: Result }) {
  let resultArr = Object.values(results.definition)

  return (
    <ul className='list-decimal ml-5'>
      {resultArr.map((result, index) => (
        <li key={index}> {result} </li>
      ))}
    </ul>
  )
}
