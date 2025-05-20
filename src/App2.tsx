import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App'
import BookSelector from './component/BookSelector/BookSelector'

export default function App2() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BookSelector />} path="/" />
        <Route element={<App />} path={`/book/:bookName`} />
      </Routes>
    </BrowserRouter>
  )
}
