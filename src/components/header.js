import React, { useContext } from 'react'
import { Box, styled } from '@mui/system'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AppContext } from '../context';

const nav = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/profile',
    text: 'Profile',
  },
  {
    to: '/catalog',
    text: 'Catalog',
  },
]

export const Header = () => {
  const { onExit, isAuth } = useContext(AppContext)

  return (
    <Container>
      <Box component="nav" py={2}>
        <List component="ul" mx={-2}>
          {nav.map(({ to, text }) => (
            <Box component="li" mx={2} key={text}>
              <LinkText to={to}>{text}</LinkText>
            </Box>
          ))}
        </List>
      </Box>
      {isAuth && <Box><Button onClick={onExit}>Exit</Button></Box>}
    </Container>
  )
}

const Container = styled('header')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
})

const List = styled(Box)({
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

const LinkText = styled(Link)({
  color: 'black',
  fontWeight: 'normal',
  fontSize: 16,
  textDecoration: 'none',
})
