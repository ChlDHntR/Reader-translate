import { Toc } from '../../type/typeDefi'
import Bookmark from './Bookmark'

export default function TOC({
  toc,
  renditionRef,
  tocDivRef,
  setTocOn,
}: {
  toc: Toc[]
  tocOn: boolean
  renditionRef: any
  tocDivRef: any
  setTocOn: any
}) {
  //   useEffect(() => {
  //     setForceRender(tocDivRef.current.getBoundingClientRect().width)
  //   }, [])
  const currentPos = renditionRef.current?.location.start.href
  //console.log(toc[2].href.split('#')[0])
  console.log(renditionRef.current)

  return (
    <div id='tocDiv' ref={tocDivRef} className={'top-0 left-0 min-w-40 h-full bg-white z-50 relative '}>
      <div className='flex flex-col overflow-y-auto h-full'>
        <div className='flex flex-row justify-between items-center p-2 bg-gray-200'>
          <h1 className='text-lg font-bold'>Table of Contents</h1>
        </div>
        <ul className='p-1 h-72 overflow-y-scroll'>
          {toc.map((item, index) => (
            <li key={index} className={`py-0 border-b-1`}>
              <a
                onClick={() => {
                  setTocOn(false)
                  renditionRef.current?.display(item.href)
                }}
                className= {`${currentPos === item.href.split('#')[0] ? 'text-black' : 'text-blue-500'} text-xs hover:underline`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Bookmark renditionRef={renditionRef} setTocOn={setTocOn} />
    </div>
  )
}
