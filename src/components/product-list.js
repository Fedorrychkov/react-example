import React, { useContext, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { AppContext } from '../context'
import { Link } from 'react-router-dom'

export const ProductList = ({ size }) => {
  const { products, setProducts, basket, handleSetBasket } = useContext(AppContext)

  useEffect(() => {
    const tryAsync = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const json = await response.json()
        setProducts(json.map(product => ({ ...product, price: 100 })))
      } catch (ex) {
        console.error(ex)
      }
    }

    !products?.length && tryAsync()
  }, [products, setProducts])

  const showProducts = (size && products?.filter((_, index) => size > index)) || products

  return (
    <Box display="flex" flexWrap="wrap">
      {showProducts?.map(product => <ProductCard key={product.id} product={product} basket={basket} handleSetBasket={handleSetBasket} />)}
    </Box>
  )
}

const ProductCard = ({ product }) => {
  return (
    <Box as="article" m={2} p={2} minWidth={240} style={{ border: '1px solid #333' }}>
      <p><Link to={`/catalog/${product.id}`} style={{ margin: 0 }}>{product.title?.slice(0, 10)}</Link></p>
      <ProductButton product={product} />
    </Box>
  )
}

export const ProductButton = ({ product }) => {
  const { basket, handleSetBasket } = useContext(AppContext)
  const isHasItem = basket?.findIndex(item => item.id === product.id)

  return (
    <Button onClick={() => handleSetBasket(product)}>
      {isHasItem > -1 ? 'Удалить из корзины' : `в корзину ${product.price} р.`}
    </Button>
  )
}
