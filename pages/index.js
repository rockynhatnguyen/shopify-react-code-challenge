import Head from 'next/head'
import { getProduct } from '../lib/shopify'
import AddToCart from '../components/AddToCart'
import ClearCart from '../components/ClearCart'
import styles from '../styles/Home.module.scss'

export default function Home({ product }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Code Challenge</title>
        <meta name="description" content="React Code Challenge for Scoutside." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.buttons}>
          <AddToCart product={product} />
          <ClearCart />
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const product = await getProduct('overstimulation');

  return {
    props: { product } // will be passed to the page component as props
  }
}