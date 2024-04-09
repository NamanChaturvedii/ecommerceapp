import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");  // gor get the item s in the running time form the local storage 
        if (existingCartItem) setCart(JSON.parse(existingCartItem));  // if the cart is found then parse it and set it in hte cart 
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };