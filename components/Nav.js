import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import MiniCart from '../components/MiniCart'
import styles from '../styles/Nav.module.scss'

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <Link href="/" passHref>
                <a>
                    <span>React Code Challenge</span>
                </a>
            </Link>
            <button 
              className={styles.miniCartButton}
              onClick={() => setCartOpen(!cartOpen)}
              >
              Cart
              <span className={styles.cartCounter}>
                <span className={styles.counterText}>{cartQuantity}</span>
              </span>
            </button>
            <MiniCart cart={cart} />
        </div>
    </header>
  )
}
