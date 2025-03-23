import './App.css'
import BooksPage from './pages/BooksPage'
import AddCartPage from './pages/AddCartPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/addcart" element={<AddCartPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
