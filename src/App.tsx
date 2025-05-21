import { BrowserRouter, Route, Routes } from 'react-router'
import ReaderIndex from './ReaderIndex'
import BookSelector from './component/BookSelector/BookSelector'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BookSelector />} path="/" />
        <Route element={<ReaderIndex />} path={`/book/:bookName`} />
      </Routes>
    </BrowserRouter>
  )
}
