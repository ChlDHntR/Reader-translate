type returnType = {
  definition: string[]
  kanaReading: string
  kanjiWriting: string[]
}

export type Result = {
  answer: returnType[]
}

export type Toc = {
  href: string
  id: string
  label: string
  parent: any
  subitems: any[]
}
