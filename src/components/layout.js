import React from 'react'
import { Box, styled } from '@mui/system'
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }) => (
  <Container>
    <Box flex={1} display="flex" flexDirection="column">
      <Header />
      <Content display="flex" flexDirection="column" flex={1}>
        {children}
      </Content>
    </Box>
    <Footer />
  </Container>
)

const Container = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Content = styled(Box)({
  backgroundColor: 'white',
});
