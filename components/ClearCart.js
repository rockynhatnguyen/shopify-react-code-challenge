import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import styles from '../styles/ClearCart.module.scss'

// Removes all product items from cart
const ClearCart = () => {
  const { clearCart } = useContext(CartContext)

  return (
    <div>
        <button 
        onClick={() => clearCart()} 
        className={styles.btnClearCart}
        >
          Clear Cart
        </button>
    </div>
  )
}

export default ClearCart;