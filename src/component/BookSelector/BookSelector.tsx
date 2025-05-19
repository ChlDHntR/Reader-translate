import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function BookSelector() {
  const [bookList, setBookList] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://172.24.128.1:3003/api/booklist')
        if (res.data) {
          setBookList(res.data.list)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [])

  const handleRedirect = (book: string) => {
    console.log('clicking', book)
    navigate(`/book/${book}`)
  }

  return (
    <div>
      <ul className="flex flex-col text-center">
        {bookList[0] &&
          bookList.map((element: string) => (
            <li
              className="m-2 font-bold border-2 rounded-md text-3xl"
              onClick={() => handleRedirect(element)}
              key={element}
            >
              {element}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BookSelector
