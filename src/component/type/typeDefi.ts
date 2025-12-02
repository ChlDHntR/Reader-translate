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
  status: boolean

  constructor(it: any) {
    if (it === null) {
      this.answer = null
      this.answer2 = null
      this.status = false
      return
    }

    this.answer = it.answer
    this.answer2 = it.answer2
    this.status = it.status
  }
}

export type Toc = {
  href: string
  id: string
  label: string
  parent: any
  subitems: any[]
}
