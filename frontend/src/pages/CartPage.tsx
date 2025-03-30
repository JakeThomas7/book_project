import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { bookInCart } from '../types/BookInCart';

const CartPage = () => {

    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.count), 0)

  return (
    <div className="container my-4">
        <div className="card p-4 shadow-sm">
            <h5 className="text-center fw-bold mb-4">Your Cart: <span className="text-success">${totalAmount.toFixed(2)}</span></h5>

            <div className="list-group">
                {cart.length > 0 ? (
                    cart.map((b: bookInCart) => (
                        <div key={b.bookID} className="list-group-item d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex flex-column">
                                <div><strong>{b.title}</strong></div>
                                <div className="text-muted">Quantity: {b.count}</div>
                                <div className="text-muted">Price: ${(b.price).toFixed(2)}</div>
                                <div className="text-muted">Sub-Total: ${(b.price * b.count).toFixed(2)}</div>
                            </div>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    removeFromCart(b.bookID);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center">Your cart is empty</p>
                )}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button 
                    className="btn btn-outline-primary" 
                    onClick={() => navigate('/')}
                >
                    Continue Shopping
                </button>
                <button className="btn btn-success">
                    Check Out
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartPage