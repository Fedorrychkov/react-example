import React from 'react'
import { Layout } from '../components/layout'
import { ProductList } from '../components/product-list'

export const CatalogPage = () => {
  return (
    <Layout>
      <div>
        <ProductList />
      </div>
    </Layout>
  )
}
