import { useEffect, useRef, useState } from 'react'
import ePub from 'epubjs'
import TOC from './TOC/TOC'
//import { ReactComponent as Bars } from '../../assets/bars.svg'
import { HiBars3 } from 'react-icons/hi2'
import useSelectedText from '../../hook/useSelectedText'
import { useParams } from 'react-router'

function EpubReader({ url }: { url: string }) {
  const viewerWrapperRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<any>(null)
  const renditionRef = useRef<any>(null)
  const [tocOn, setTocOn] = useState(false)
  const tocDivRef = useRef<HTMLDivElement>(null)
  const { setSelectedText } = useSelectedText()
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    total: 0,
    chapterTitle: '',
  })
  const { bookName } = useParams()
  const buttonClassName = 'text-base w-30/100'
  //const [jumpPage, setJumpPage] = useState('')

  // useEffect(() => {
  //   if (tocDivRef.current) {
  //   }
  // }, [delta])

  useEffect(() => {
    if (!viewerRef.current) return

    const book = ePub(url)
    bookRef.current = book

    let rendition: any = null

    rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
    })
    renditionRef.current = rendition
    rendition.themes.fontSize('100%')

    const bookmark = localStorage.getItem(bookName || '')
    //rendition.display()
    if (bookmark) {
      rendition.display(bookmark)
    } else {
      rendition.display()
    }

    rendition.on('selected', function (cfiRange: any, contents: any) {
      console.log(cfiRange)
      const selection = contents.window.getSelection()
      const selectedText = selection.toString()
      setSelectedText(selectedText)
    })

    rendition.on('relocated', (location: any) => {
      const { displayed, href } = location.start

      // Update chapter title
      const spineItem = book.spine.get(href).href
      const title = spineItem ? spineItem || 'Untitled' : 'Untitled'

      setPageInfo({
        page: displayed.page,
        total: displayed.total,
        chapterTitle: title,
      })
    })

    return () => {
      book.destroy()
    }
  }, [url])

  const handleDisplayToc = () => {
    setTocOn((prev) => !prev)
  }

  const handleNext = () => {
    renditionRef.current?.next()
  }

  const handlePrev = () => {
    renditionRef.current?.prev()
  }

  // const handleJump = () => {
  //   // Use displayed.page
  //   let renditionAAA = renditionRef.current
  //   if (renditionAAA.location.start.cfi === jumpPage) {
  //     return
  //   }
  //   renditionRef.current?.display(jumpPage)
  // }

  //console.log(bookRef.current?.navigation.toc)
  //console.log(renditionRef.current?.location)

  return (
    <div
      ref={viewerWrapperRef}
      className={'flex flex-row overflow-hidden absolute '}
      style={{ left: tocOn ? '0px' : '-160px' }}
    >
      {bookRef.current && (
        <TOC
          toc={bookRef.current.navigation.toc}
          tocOn={tocOn}
          renditionRef={renditionRef}
          tocDivRef={tocDivRef}
          setTocOn={setTocOn}
        />
      )}
      <div className='h-screen min-w-screen  p-3'>
        {/* Control buttons */}
        <div className='flex mb-2.5 justify-between'>
          <div className='flex flex-row'>
            <HiBars3 onClick={handleDisplayToc} className='h-6 w-6 text-blue-400' />
          </div>

          {/* Jump to page */}
          {/* <div>
            <input
              type='text'
              value={jumpPage}
              disabled={false}
              onChange={(e) => setJumpPage(e.target.value)}
              placeholder='Page number'
              style={{ width: 80, marginRight: 5 }}
            />
            <button onClick={handleJump}>Go</button>
          </div> */}
        </div>

        {/* Reader viewport */}
        <div
          ref={viewerRef}
          style={{
            width: '100%',
            height: '85%',
            border: '1px solid #ccc',
            overflow: 'scroll',
          }}
        />

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 14 }} className='flex justify-between'>
          <button onClick={handleNext} className={buttonClassName}>
            ⬅ Next
          </button>
          <div>
            <div>
              <strong>{pageInfo.chapterTitle}</strong>
            </div>
            <div>
              Page {pageInfo.page} / {pageInfo.total}
            </div>
          </div>
          <button onClick={handlePrev} className={buttonClassName}>
            Prev ➡
          </button>
        </div>
      </div>
    </div>
  )
}

export default EpubReader
