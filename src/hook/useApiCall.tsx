import axios from 'axios'

export default function useApiCall(
  api: string,
  url: string,
  content: null | any
) {
  let data: any

    const fetch = async () => {
      try {
        if (api === 'get') {
          data = axios.get(url)
        }
        if (api === 'post') {
          data = axios.post(url, content)
        }
      } catch (err) {
        console.log(err)
      }
      return data.data
    }

  return fetch()
}
