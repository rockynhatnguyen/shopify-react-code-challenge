import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import styles from '../styles/AddToCart.module.scss'

// Adds a specific product item to cart
export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext)

  const selectedVariant = {
        id: product.variants.edges[0].node.id,
        title: product.title,
        handle: product.variants.edges[0].node.handle,
        image: product.variants.edges[0].node.image?.url,
        variantTitle: product.variants.edges[0].node.title,
        variantPrice: product.variants.edges[0].node.priceV2.amount,
        variantQuantity: 1
  }

  return (
    <div>
        <button 
          onClick={() => {
              addToCart(selectedVariant)
          }}
          className={styles.btnAddToCart}>
              Add To Cart
        </button>
    </div>
  )
}