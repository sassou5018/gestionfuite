import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Box, Button, Flex } from '@chakra-ui/react'

export default function Home() {
  const styling = {
    backgroundImage: `url(https://cdn.britannica.com/65/141465-050-27DD80DD/drinking-water-reservoir-Sywell-County-Park-Eng-Northamptonshire.jpg)`,
    backgroundSize: 'cover'
    
  }


  return (
    <div style={styling}>
    <Head>
      <title>Systeme de reclamation de fuites</title>
    </Head>
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Flex borderRadius="5px" bg="#EDF2F7" width="60vh" height="30vh" flexDirection="column" justifyContent="center" alignItems="center">
        <p>Bienvenue au systeme de reclamation et de gestion des fuites.</p>
        <Link href="/reclamation">
          <Button colorScheme='blue'>Reclamez Une Fuite</Button>
        </Link>
      </Flex>
    </Flex>
    </div>
  )
}
