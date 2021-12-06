import { Button } from '@mui/material'
import React from 'react'
import { Layout } from '../components/layout'

export const WelcomePage = () => {
  return (
    <Layout>
      <div>
        is welcome
        <Button variant="contained">Hello World</Button>
      </div>
    </Layout>
  )
}
