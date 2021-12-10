import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { Layout } from '../components/layout'
import { AppContext } from '../context'

export const BasketPage = () => {
  const { basket, handleаIncrementQuantity, handleаDecrementQuantity } = useContext(AppContext)
  const sum = basket?.reduce((sum, product) => {
    return sum + product.price * product.quantity
  }, 0)
  return (
    <Layout>
      <div>
        {basket?.map(product => (
          <Box display="flex" justifyContent="space-between" alignItems="center" key={product.id} my={2} style={{ border: '1px solid #333'}}>
            <Box flex={1}>
              <Box>
                {product.title.slice(0, 10)}
              </Box>
              <Box>
                {product.id}
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" >
              <Box>{product?.price * product?.quantity} руб.</Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button disabled={product?.quantity <= 1} onClick={() => handleаDecrementQuantity(product)}>-</Button>
                <Box>{product?.quantity ?? 1}</Box>
                <Button onClick={() => handleаIncrementQuantity(product)}>+</Button>
              </Box>
            </Box>
          </Box>
        ))}
        <Box>
          all Sum: {sum}
        </Box>
      </div>
    </Layout>
  )
}
