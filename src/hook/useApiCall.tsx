import axios from 'axios'

export default function useApiCall(
  api: string,
  url: string,
  content: null | any
) {
  let data: any
  const baseURl = ''
    const fetch = async () => {
      try {
        if (api === 'get') {
          data = axios.get(`${baseURl+url}`)
        }
        if (api === 'post') {
          data = axios.post(`${baseURl+url}`, content)
        }
      } catch (err) {
        console.log(err)
      }
      return data.data
    }

  return fetch()
}
