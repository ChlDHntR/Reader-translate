import { useParams } from 'react-router'

export default function Bookmark({ renditionRef, setTocOn }: { renditionRef: any; setTocOn: any }) {
  const { bookName } = useParams()

  const handleAddBookmark = () => {
    localStorage.setItem(bookName || '', renditionRef.current?.location.start.cfi)
    alert('Bookmark added')
  }
  const handleLoadBookmark = () => {
    let bookmark = localStorage.getItem(bookName || '')
    if (!bookmark) {
      alert('No bookmark found')
      return
    }
    let renditionAAA = renditionRef.current
    if (renditionAAA.location.start.cfi === bookmark) {
      return
    }
    renditionRef.current?.display(bookmark)
    setTocOn(false)
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl font-bold'>Bookmark</h1>
      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleAddBookmark}>
        Add Bookmark
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleLoadBookmark}>
        Load Bookmark
      </button>
    </div>
  )
}
