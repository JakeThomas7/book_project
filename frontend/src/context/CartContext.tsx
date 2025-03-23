import { createContext, ReactNode, useContext, useState } from "react";
import { book } from "../types/Books";
import { bookInCart } from "../types/BookInCart";

interface CartContextType {
    cart: bookInCart[];
    addToCart: (item: book) => void;
    removeFromCart: (bookID: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<bookInCart[]>([])

    const addToCart = (item: book) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((b) => b.bookID == item.bookID)
            const updatedCart = prevCart.map((b) => 
                b.bookID == item.bookID ? {...b, count: b.count + 1} : b
            );

            return existingItem ? updatedCart : [...prevCart, {...item, count: 1}]
        });
    }

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((b) => b.bookID !== bookID))
    }

    const clearCart = () => {
        setCart(() => []);
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("Use cart must be used within a CartProvider")
    }
    return context
}