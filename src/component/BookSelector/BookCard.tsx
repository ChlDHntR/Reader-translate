import { BaseUrl } from "../type/BaseUrl";

export default function BookCard({ bookName, handleRedirect }: { bookName: string; handleRedirect: any }) {
  return (
    <div className='max-w-40 bg-white shadow-md overflow-hidden' onClick={handleRedirect}>
      <div className='aspect-[2/3]'>
        <img
          className='w-full h-full object-cover'
          src={`${BaseUrl.returnUrl()}/book1/covers/${bookName}.jpg`}
          alt='bookCover'
        />
      </div>
      <div className='min-h-15 wrap-break-word'>
        <p className='truncate text-[clamp(1rem,4vw,1.25rem)] text-center'>{bookName}</p>
      </div>
    </div>
  )
}
