import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AppContext } from '../context'

export const ProtectedPage = ({ children }) => {
  const { isAuth } = useContext(AppContext)

  return isAuth ? (
    <>
      {children}
    </>
  ) : <Navigate to="/login" />
}
