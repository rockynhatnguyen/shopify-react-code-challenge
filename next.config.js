const path = require('path');

module.exports = {
  reactStrictMode: false,
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
  },
  images: {
    domains: ['cdn.shopify.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

