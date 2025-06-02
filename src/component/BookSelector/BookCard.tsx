export default function BookCard({bookName, handleRedirect} : {bookName: string, handleRedirect: any}) {

    return (
        <div className='grid-cols-2' onClick={handleRedirect}>
            <img src={`https://dictionary-api-server.onrender.com/book1/covers/${bookName}.jpg`} alt="bookCover" />
            <h1>{bookName}</h1>
        </div>
    )
}