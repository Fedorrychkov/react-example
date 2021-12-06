import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { CatalogPage } from './pages/catalog-page'
import { WelcomePage } from './pages/welcome-page'
import { ProfilePage } from './pages/profile-page'
import { AuthPage } from './pages/auth-page'
import { ProtectedPage } from './components/protected-page'
import { AppContext } from './context'

export const RoutesMap = () => {
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

  useEffect(() => {
    localStorage.setItem('isAuth', isAuth)
  }, [isAuth])

  return (
    <AppContext.Provider value={{ onAuth, onExit, isAuth }}>
      <Routes>
        <Route path="/*" element={<WelcomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
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
