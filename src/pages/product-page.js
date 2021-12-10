import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/layout'
import { ProductButton } from '../components/product-list'
import { AppContext } from '../context'

export const ProductPage = ({ location }) => {
  const { products } = useContext(AppContext)
  const { id } = useParams()
  const [product, setProduct] = useState(() => products?.find(product => product.id === +id))

  useEffect(() => {
    const tryAsync = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const json = await response.json()
        setProduct(json)
      } catch (ex) {
        console.error(ex)
      }
    }

    !product && tryAsync()
  }, [product, id])

  return (
    <Layout>
      <div>
        <p>{product?.title}</p>
        <p>{product?.body}</p>
        <ProductButton product={product} />
      </div>
    </Layout>
  )
}
