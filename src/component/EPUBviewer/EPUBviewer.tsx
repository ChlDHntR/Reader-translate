import { useEffect, useRef, useState } from 'react'
import ePub from 'epubjs'
import TOC from './TOC/TOC'
//import { ReactComponent as Bars } from '../../assets/bars.svg'
import { HiBars3 } from 'react-icons/hi2'
import useSelectedText from '../../hook/useSelectedText'
import { useNavigate, useParams } from 'react-router'
import SlideBtn from './UI/SlideBtn'
import * as cowsay from 'cowsay'
import useThemeChanger from '../../hook/useThemeChanger'

function EpubReader({ url }: { url: string }) {
  const viewerWrapperRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<any>(null)
  const renditionRef = useRef<any>(null)
  const tocReady = useRef<boolean>(false)
  const [tocOn, setTocOn] = useState(false)
  const tocDivRef = useRef<HTMLDivElement>(null)
  const { setSelectedText } = useSelectedText()
  const { darkTheme } = useThemeChanger()
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    total: 0,
    chapterTitle: '',
  })
  const { bookName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!viewerRef.current) return

    const book = ePub(url)
    bookRef.current = book

    bookRef.current.ready.then(() => {
      tocReady.current = true
    })

    let rendition: any = null

    rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '600px',
    })

    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isiOS) {
      rendition.themes.fontSize('12px')
    } else {
      rendition.themes.fontSize('1em')
    }

    rendition.themes.default({
      body: {
        '-webkit-text-size-adjust': '100% !important;',
        'text-size-adjust': '100% !important',
      },
    })

    renditionRef.current = rendition

    const bookmark = localStorage.getItem(bookName || '')
    //rendition.display()
    if (bookmark) {
      rendition.display(bookmark)
    } else {
      rendition.display()
    }

    const selectEvent = (cfiRange: any, contents: any) => {
      console.log(cowsay.say({ text: cfiRange }))
      const selection = contents.window.getSelection()
      const selectedText = selection.toString()
      setSelectedText(selectedText)
    }

    rendition.on('selected', selectEvent)

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

    cowsay.say({ text: 'run' })

    return () => {
      book.destroy()
      setSelectedText('')
    }
  }, [])

  useEffect(() => {
    if (darkTheme) {
      renditionRef.current.themes.register('dark-theme', {
        body: {
          color: `#E8E8E8`,
        },
      })
      renditionRef.current.themes.select('dark-theme')
    }
  }, [darkTheme])

  const handleDisplayToc = () => {
    setTocOn((prev) => !prev)
  }

  const handleNext = () => {
    renditionRef.current?.next()
  }

  const handlePrev = () => {
    renditionRef.current?.prev()
  }

  return (
    <div ref={viewerWrapperRef} className={'flex flex-row overflow-hidden absolute '}>
      {/*Table of content*/}
      {tocReady.current && (
        <div className='absolute h-full transition-all delay-50' style={{ left: tocOn ? '0px' : '-160px' }}>
          <TOC
            toc={bookRef.current.navigation.toc}
            tocOn={tocOn}
            renditionRef={renditionRef}
            tocDivRef={tocDivRef}
            setTocOn={setTocOn}
          />
        </div>
      )}
      <div className={`h-screen w-screen p-3`}>
        {/* Control buttons */}
        <div className='flex mb-2.5 justify-end'>
          <div
            className='flex flex-row absolute pl-3 transition-all delay-50'
            style={{ left: tocOn ? '160px' : '0px' }}
          >
            <HiBars3 onClick={handleDisplayToc} className='h-6 w-6 text-blue-400' />
          </div>

          <div className='mr-1'>
            <SlideBtn />
          </div>

          <div
            onClick={() => navigate('/')}
            className='flex flex-row items-center text-white bg-blue-500 rounded-lg pl-0.5 pr-1 cursor-pointer'
          >
            <p>CHANGE BOOK</p>
          </div>
        </div>

        {/* Reader viewport */}
        <div
          ref={viewerRef}
          style={{
            width: '100%',
            height: '85%',
            border: '1px solid #ccc',
            overflow: 'scroll',
            color: 'white',
          }}
        />

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 14 }} className='flex justify-between'>
          <button
            onClick={handleNext}
            className={'text-base w-30/100 active:opacity-5 transition transform duration-150'}
          >
            {'<<'} Next
          </button>
          <div>
            <div>
              <strong>{pageInfo.chapterTitle}</strong>
            </div>
            <div>
              Page {pageInfo.page} / {pageInfo.total}
            </div>
          </div>
          <button
            onClick={handlePrev}
            className={'text-base w-30/100 active:opacity-5 transition transform duration-150'}
          >
            Prev {'>>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EpubReader
