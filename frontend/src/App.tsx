import './App.css'
import BooksPage from './pages/BooksPage'
import AddCartPage from './pages/AddCartPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminProjectsPage from './pages/AdminProjectsPage'

function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/addcart" element={<AddCartPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminProjectsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
