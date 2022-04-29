import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)
    const [checkoutId, setCheckoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')

    // Initializes Cart onLoad from localStorage if it exists
    useEffect(() => {
        if (localStorage.checkout_id) {
            const cartObject = JSON.parse(localStorage.checkout_id)

            if (cartObject[0].id) {
                setCart([cartObject[0]])
            } else if (cartObject[0].length > 0) {
                setCart(...[cartObject[0]])
            }

            setCheckoutId(cartObject[1].id)
            setCheckoutUrl(cartObject[1].url)
        }
    }, [])

    // Adds an item to cart
    async function addToCart(newItem) {
        setCartOpen(true)

        // Create a new cart and adds item
        if (cart.length === 0) {
            setCart([newItem])

            const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

            setCheckoutId(checkout.id)
            setCheckoutUrl(checkout.webUrl)

            localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
        }
        // Adds an item to an existing cart
        else {
            let newCart = []
            let added = false

            cart.map(item => {
                if(item.id === newItem.id) {
                    item.variantQuantity++
                    newCart = [...cart]
                    added = true
                }
            })

            if (!added) {
                newCart = [...cart, newItem]
            }

            setCart(newCart)
            const newCheckout = await updateCheckout(checkoutId, newCart)
            localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
        }
    }

    async function removeCartItem(itemToRemove) {
        const updatedCart = cart.filter(item => item.id !== itemToRemove)

        setCart(updatedCart)

        const newCheckout = await updateCheckout(checkoutId, updatedCart)

        localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))

        // Closes MinCart if Cart becomes empty
        if ( cart.length === 1 ) {
            setCartOpen(false)
        }
    }

    async function clearCart() {
        const updatedCart = []

        setCart(updatedCart)

        const newCheckout = await updateCheckout(checkoutId, updatedCart)

        localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))
        
        setCartOpen(true)
    }

    return (
        <CartContext.Provider value={{
            cart,
            cartOpen,
            setCartOpen,
            addToCart,
            removeCartItem,
            clearCart,
            checkoutUrl
        }}>
            {children}
        </CartContext.Provider>
    )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }