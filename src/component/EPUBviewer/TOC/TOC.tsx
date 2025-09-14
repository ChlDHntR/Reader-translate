import { Toc } from '../../type/typeDefi'
import Bookmark from './Bookmark'
import useThemeChanger from '../../../hook/useThemeChanger'

export default function TOC({
  toc,
  renditionRef,
  tocDivRef,
  setTocOn,
  tocOn,
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
  const { darkTheme } = useThemeChanger()

  return (
    <div
      id='tocDiv'
      ref={tocDivRef}
      className={`top-0 left-0 w-40 h-full ${darkTheme ? 'bg-[#393E46] ' : 'bg-gray-200 '} relative ${
        tocOn ? 'z-150' : 'z-50'
      }`}
    >
      <div className='flex flex-col overflow-y-auto'>
        <div className='flex flex-row justify-between items-center p-2'>
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
                className={`${currentPos === item.href.split('#')[0] ? '' : 'text-blue-500'} text-xs hover:underline`}
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
