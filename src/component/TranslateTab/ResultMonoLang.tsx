import { useContext, useEffect, useState } from 'react'
import { ResultContext } from '../context/resultProvider'
import { ResultClass } from '../type/typeDefi'

export default function ResultMonoLang({realResult} : {realResult: any}) {

  return (
    <div>
        <p className='ml-4'>{realResult.answer2}</p>
    </div>
  )
}
