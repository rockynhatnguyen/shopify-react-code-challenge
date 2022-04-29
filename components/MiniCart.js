import { Fragment, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { CartContext } from '../context/shopContext'
import formatter from '../utils/helpers'
import styles from '../styles/MiniCart.module.scss'

export default function MiniCart({ cart }) {
    const cancelButtonRef = useRef()

    const { cartOpen, setCartOpen, checkoutUrl, removeCartItem } = useContext(CartContext)

    let cartTotal = 0
    cart.map(item => {
        cartTotal += item?.variantPrice * item?.variantQuantity
    })

    return (
        <Transition.Root show={cartOpen} as={Fragment}>
            <Dialog 
                as="div" 
                className={styles.miniCart} 
                onClose={() => { setCartOpen(!cartOpen)} } 
                initialFocus={cancelButtonRef} >
            <div className={styles.miniCartWrapper}>
                <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Dialog.Overlay className={styles.miniCartOverlay} />
                </Transition.Child>

                <div className={styles.miniCartTray}>
                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <div className={styles.wrapper}>
                    <div className={styles.shadow}>
                        <div className={styles.lineItems}>
                        <div className={styles.header}>
                            <Dialog.Title className={styles.title}> Shopping cart </Dialog.Title>
                            <div className={styles.closeWrapper}>
                            <button
                                ref={cancelButtonRef}
                                type="button"
                                className={styles.close}
                                onClick={() => setCartOpen(false)}
                            >
                                <XIcon className={styles.icon} aria-hidden="true" />
                            </button>
                            </div>
                        </div>


                        <div className={styles.lineItemsWrapper}>
                        {
                            cart.length > 0 ?

                            <ul role="list">
                                {cart.map((product) => (
                                <li key={product.id + Math.random()} className={styles.lineItemWrapper}>
                                    <div className={styles.lineItemImage}>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    </div>

                                    <div className={styles.lineItemContent}>
                                    <div>
                                        <div className={styles.lineItemTitle}>
                                        <h3>{product.title}</h3>
                                        <p className={styles.lineItemPrice}>{formatter.format(product.variantPrice)}</p>
                                        </div>
                                        <p className={styles.lineItemVariant}>{product.variantTitle}</p>
                                    </div>
                                    <div className={styles.lineItemQuantityWrapper}>
                                        <p className={styles.qtyText}>Qty {product.variantQuantity}</p>

                                        <div>
                                        <button 
                                            onClick={() => removeCartItem(product.id)} 
                                            type="button" 
                                            className={styles.lineItemRemove}>
                                            Remove
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </li>
                                ))}
                            </ul> :
                            <div>
                                <p>Nothing in your cart!</p>
                            </div>
                        }
                        </div>
                        </div>

                        {
                            cart.length > 0 ? 
                            <div className={styles.checkoutWrapper}>
                                <div className={styles.checkoutTotal}>
                                <p>Total</p>
                                <p>{formatter.format(cartTotal)}</p>
                                </div>
                                <p className={styles.checkoutShippingTaxText}>Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                <a
                                    href={checkoutUrl}
                                    className={styles.checkoutButton}
                                >
                                    Checkout
                                </a>
                                </div>
                            </div> : null
                        }
                    </div>
                    </div>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition.Root>
    )
}
