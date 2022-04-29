const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-04/graphql.json`

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
    }

    try {
        const data = await fetch(URL, options).then(res => {
            return res.json()
        })

        return data
    } catch (err) {
        throw new Error('Product not fetched');
    }
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 5) {
        edges {
          node {
            id
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `
  const response = await ShopifyData(query);

  const slugs = response.data.products.edges ? response.data.products.edges : []
  return slugs;
}

export async function getProduct(handle) {
  const query = `
    {
      product(handle: "${handle}") {
        collections(first: 1) {
          edges {
            node {
              products(first: 5) {
                edges {
                  node {
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                    handle
                    title
                    id
                    images(first: 5) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        id
        title
        handle
        description
        images(first: 3) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
          id
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
              }
              selectedOptions {
                name
                value
                
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `

  const response = await ShopifyData(query);

  const product = response.data.product ? response.data.product : []

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }
  `

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map(item => {
    return `{
      variantId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`
  })

  const query = `
    mutation {
      checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
      }
    }
  `

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []

  return checkout;
}