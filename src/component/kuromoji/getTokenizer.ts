// No need for `@ts-ignore`, contains index.d.ts by default.
import kuromoji from '@sglkc/kuromoji'

type Tokenizer = {
  tokenize: (text: string) => kuromoji.IpadicFeatures[]
}

class Deferred {
  promise: Promise<Tokenizer>
  resolve!: (value: Tokenizer) => void
  reject!: (reason: Error) => void
  constructor() {
    this.promise = new Promise<Tokenizer>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

const deferred = new Deferred()
let isLoading = false

export const getTokenizer = () => {
  if (isLoading) {
    return deferred.promise
  }
  isLoading = true
  const builder = kuromoji.builder({
    dicPath: './assets/dicts',
  })
  builder.build((err: undefined | Error, tokenizer: Tokenizer) => {
    if (err) {
      deferred.reject(err)
    } else {
      deferred.resolve(tokenizer)
    }
  })
  return deferred.promise
}