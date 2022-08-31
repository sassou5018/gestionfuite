import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Box, Button, Flex } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

export default function Home() {
  const styling = {
    backgroundImage: `url(https://images.unsplash.com/photo-1560279966-2d681f3d4dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    
  }


  return (
    <div style={styling}>
    <Head>
      <title>Systeme de reclamation de fuites</title>
    </Head>
    <Navbar/>
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Flex borderRadius="10px" bg="cyan.100" width="60vh" height="30vh" flexDirection="column" justifyContent="center" alignItems="center">
        <p>Bienvenue au systeme de reclamation et de gestion des fuites.</p>
        <Link href="/reclamation">
          <Button colorScheme='blue' marginTop='20px'>Reclamez Une Fuite</Button>
        </Link>
      </Flex>
    </Flex>
    </div>
  )
}
