import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function AddCartPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const book = location.state?.book;
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(book)
        navigate('/cart')
    }

    return (
        <>
            <div>Add {book.title} to cart.</div>
            <button className="btn btn-success me-2" onClick={handleAddToCart}>Confirm</button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default AddCartPage