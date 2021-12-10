import React from 'react'
import { Layout } from '../components/layout'
import { ProductList } from '../components/product-list'

export const WelcomePage = () => {
  return (
    <Layout>
      <div>
        <ProductList size={4} />
      </div>
    </Layout>
  )
}
