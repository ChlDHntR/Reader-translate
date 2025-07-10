import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import BookCard from './BookCard'
import useApiCall from '../../hook/useApiCall'

function BookSelector() {
  const [bookList, setBookList] = useState<string[]>([])
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    // const fetch = async () => {
    //   try {
    //     const res = await axios.get('https://dictionary-api-server.onrender.com/api/booklist')
    //     if (res.data) {
    //       setBookList(res.data.list)
    //       setFetching(false)
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // fetch()

    useApiCall(
      'get', 
      '/api/booklist', 
      (arg) => {
        setBookList(arg.list)
        setFetching(false)
      } ,
      null)
      
  }, [])

  const handleRedirect = (book: string) => {
    console.log('clicking', book)
    navigate(`/book/${book}`)
  }

  return (
    <>
      {fetching ? (
        <div className='flex justify-center items-center h-screen'>FETCHING DATA...</div>
      ) : (
        <div>
          <h1 className='text-center font-bold text-lg'>SELECT BOOK</h1>
          <div className='flex flex-wrap gap-6 justify-start p-4'>
            {bookList[0] &&
              bookList.map((element: string) => (
                <BookCard key={element} handleRedirect={() => handleRedirect(element)} bookName={element} />
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default BookSelector
