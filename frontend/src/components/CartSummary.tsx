import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { bookInCart } from '../types/BookInCart';

const CartSummary = () => {

    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.count), 0)


    return (
        <div className="card p-3 shadow-sm">
            <h5 className="text-center fw-bold mb-3">Your Cart: <span className="text-success">${totalAmount.toFixed(2)}</span></h5>
            
            <div className="list-group">
                {cart.length > 0 ? (
                    cart.map((b: bookInCart) => (
                        <div key={b.bookID} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div><strong>{b.title}</strong></div>
                                <div>Quantity: {b.count}</div>
                                <div>Price: ${(b.price).toFixed(2)}</div>
                                <div>Sub-Total: ${(b.price * b.count).toFixed(2)}</div>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={(e) => {
                                e.stopPropagation(); 
                                removeFromCart(b.bookID);
                            }}>
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center">Your cart is empty</p>
                )}
            </div>

            <button className="btn btn-success mt-4" onClick={() => navigate('/cart')}>Go to Cart</button>
        </div>
    );
}

export default CartSummary