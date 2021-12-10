import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { CatalogPage } from './pages/catalog-page'
import { WelcomePage } from './pages/welcome-page'
import { ProfilePage } from './pages/profile-page'
import { AuthPage } from './pages/auth-page'
import { ProtectedPage } from './components/protected-page'
import { AppContext } from './context'
import { ProductPage } from './pages/product-page'
import { BasketPage } from './pages/basket-page'

export const RoutesMap = () => {
  const [products, setProducts] = useState()
  const [basket, setBasket] = useState(() => {
    return JSON.parse(localStorage.getItem('basket')) || []
  })

  const [isAuth, setIsAuth] = useState(() => {
    const isAuth = localStorage.getItem('isAuth')
    
    if (isAuth === 'true') {
      return true
    }

    return false
  })

  const onAuth = (login, password) => {
    if (login && password) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }

  const onExit = () => {
    setIsAuth(false)
  }

  const handleSetBasket = (product) => {
    const hasProductIndex = basket?.findIndex(item => item.id === product.id)
    if (hasProductIndex > -1) {
      return setBasket(products => {
        const newProducts = products.filter(item => item.id !== product.id)
        localStorage.setItem('basket', JSON.stringify(newProducts))
  
        return newProducts
      })
    }

    localStorage.setItem('basket', JSON.stringify([...(basket ?? []), { ...product, quantity: 1 }]))
    setBasket([...(basket ?? []), { ...product, quantity: 1 }])
  }

  const handleGetBasketProductsAfterCompute = (product, type = 'increment') => basket?.map(item => {
    if (item.id === product.id) {
      return {
        ...product,
        quantity: type === 'decrement' ? product.quantity - 1 : product.quantity + 1,
      }
    }

    return item
  })

  const handleаIncrementQuantity = (product) => {
    const basketProducts = handleGetBasketProductsAfterCompute(product)

    setBasket(basketProducts)
  }

  const handleаDecrementQuantity = (product) => {
    const basketProducts = handleGetBasketProductsAfterCompute(product, 'decrement')

    setBasket(basketProducts)
  }

  useEffect(() => {
    localStorage.setItem('isAuth', isAuth)
  }, [isAuth])
  return (
    <AppContext.Provider value={{ onAuth, onExit, isAuth, products, setProducts, basket, setBasket, handleSetBasket, handleаIncrementQuantity, handleаDecrementQuantity }}>
      <Routes>
        <Route path="/*" element={<WelcomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<ProductPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/profile" element={
          <ProtectedPage>
            <ProfilePage />
          </ProtectedPage>
        } />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </AppContext.Provider>
  )
}
