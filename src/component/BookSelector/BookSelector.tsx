import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import BookCard from './BookCard'

function BookSelector() {
  const [bookList, setBookList] = useState<string[]>([])
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://dictionary-api-server.onrender.com/api/booklist')
        if (res.data) {
          setBookList(res.data.list)
          setFetching(false)
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
      {fetching ? (
        <div className='flex justify-center items-center h-screen'>FETCHING DATA...</div>
      ) : (
        <div>
            {bookList[0] &&
              bookList.map((element: string) => (
                <BookCard handleRedirect={() => handleRedirect(element)} bookName={element} />
              ))}
        </div>
      )}
    </div>
  )
}

export default BookSelector
