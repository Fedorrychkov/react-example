import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router'
import { Layout } from '../components/layout'
import { AppContext } from '../context'

export const AuthPage = () => {
  const { onAuth, isAuth } = useContext(AppContext)
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  
  const onLogin = (e) => {
    e.preventDefault()
    onAuth(login, password)
  }

  if (isAuth) {
    return <Navigate to="/profile" />
  }

  return (
    <Layout>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Box width="100%" maxWidth={320} component="form" display="flex" flexDirection="column" onSubmit={onLogin}>
          <TextField
            label="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            size="small"
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />
          <Button type="submit">Sign in</Button>
        </Box>
      </Box>
    </Layout>
  )
}
