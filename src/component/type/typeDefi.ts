type returnType = {
  definition: string[]
  kanaReading: string
  kanjiWriting: string[]
}

// export type Result = {
//   answer: returnType[]
// }

export class ResultClass {
  answer: null | returnType[]
  answer2: any

  constructor(it: any) {
    if (it === null) {
      this.answer = null
      this.answer2 = null
      return
    }
    
    if (it.answer !== 'no result found') {
      this.answer = it.answer
    } else {
      this.answer = null
    }
    if (it.answer2 !== 'no result found') {
      this.answer2 = it.answer2
    } else {
      this.answer2 = null
    }
  }
}

export type Toc = {
  href: string
  id: string
  label: string
  parent: any
  subitems: any[]
}
