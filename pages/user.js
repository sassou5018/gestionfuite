import connectMongo from '../utils/connectMongo';
import Reclam from '../components/Reclam';
import users from '../utils/dbModels/users';
import cities from '../utils/dbModels/cities';
import districts from '../utils/dbModels/districts';
import {useSession} from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import {signOut} from 'next-auth/react';
import reclamations from '../utils/dbModels/reclamations';
import { VStack, Box, Button, Heading, useToast, IconButton } from '@chakra-ui/react';
import {CloseIcon, DeleteIcon} from '@chakra-ui/icons';
import Head from 'next/head';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function Dashboard({reclams}) {
    const toast = useToast();
    const { data: session } = useSession()
    console.log(reclams)
    if (session && reclams.length > 0) {
    const reclamElem = reclams.map(reclam => {
        async function handleClick(e){
            e.preventDefault();
            const fetchData = {
                email: session.user.email,
                reclamation_id: reclam._id.toString()
            }
            console.log(fetchData);
            const endpoint = '/api/pullReclamation';
            const options = {
                method: 'DELETE',
                Headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fetchData)
            }
            const response = await fetch(endpoint, options);
            const result = await response.json();
            if (result.error){
                toast({
                    title: result.error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            } else {
                console.log(result);
                toast({
                    title: 'Successfully deleted',
                    status: 'success',
                    duration: 6000,
                    isClosable: true
                })
                setTimeout( ()=> {window.location.reload()}, 5000 )
            }
            
        }
        return (
            <div key={reclam._id}>
            <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Reclamation id: {reclam._id}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <Reclam key={reclam._id} description={reclam.description} city={reclam.city} district={reclam.district} time={reclam.time} progress={reclam.progress} id={reclam._id} />
            <Button colorScheme='red' onClick={handleClick} leftIcon={<DeleteIcon/>}>Delete</Button>
            </AccordionPanel>
          </AccordionItem>
          </div>




            
        )
    } )
    return (
        <>
        <Head>
            <title>Vos Reclamations</title>
            <link rel='icon' href='https://www.annuaire.rn.tn/images/sites/803/49/_thumb1/sonede.png'/>
        </Head>
        <Navbar/>
        <Heading>Bienvenue Utilisateur {session.user.email}</Heading>
        <Heading as='h2'>Vos Reclamations:</Heading>
        <VStack>
            <Accordion allowToggle>
                {reclamElem}
            </Accordion>
            <Button colorScheme='red' onClick={signOut} leftIcon={<CloseIcon/>}>Sign Out</Button>
        
        </VStack>
        </>
    )
  }
  if (reclams.length === 0){
    return (
    <>
    <Navbar/>
    <Heading color='red'>Pas De Reclamations associées a ce compte</Heading>
    <Button colorScheme='red' onClick={signOut} leftIcon={<CloseIcon/>}>Sign Out</Button>
    </>
    )
  }
}

  export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    console.log(session);
    console.log(cities, districts);
    if (session){
        connectMongo();
        const user = await users.findOne({email: session.user.email});
        const reclams = await reclamations.find({'_id': {$in: user.reclamations}}).populate('city district')
        return {
            props: {
                reclams: JSON.parse(JSON.stringify(reclams))
            }
        }
    }
    
    return {
        props: {
            reclams: JSON.stringify(['error'])
        }
    }
}
  
  Dashboard.auth = true