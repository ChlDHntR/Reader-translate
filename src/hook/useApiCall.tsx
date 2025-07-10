import axios from 'axios'
import { BaseUrl } from '../component/type/BaseUrl'

export default async function useApiCall(
  api: string,
  url: string,
  callback: (arg: any) => void,
  content: null | any
) {
  let res: any
  const baseURl = BaseUrl.returnUrl()
  try {
    if (api === 'get') {
      res = await axios.get(`${baseURl + url}`)
      callback(res.data)
    }
    if (api === 'post') {
      res = await axios.post(`${baseURl + url}`, content)
      callback(res.data)
    }
  } catch (err) {
    console.log(err)
  }
}
