import {useSession} from 'next-auth/react';
import Reclam from '../components/Reclam';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextAuth]';
import users from '../utils/dbModels/users';
import reclamations from '../utils/dbModels/reclamations';
import connectMongo from '../utils/connectMongo';
import { VStack, Box, Button, Heading, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';

export default function Dashboard({reclams}) {
    const toast = useToast();
    const { data: session } = useSession()
    console.log(reclams)
    if (session) {
    const reclamElem = reclams.map(reclam => {
        async function handleClick(e){
            e.preventDefault();
            const fetchData = {
                email: session.user.email,
                reclamation_id: reclam._id
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
            <Button colorScheme='red' onClick={handleClick}>Delete</Button>
            </AccordionPanel>
          </AccordionItem>
          </div>




            
        )
    } )
    return (
        <>
        <Head>
            <title>Vos Reclamations</title>
        </Head>
        <Heading>Bienvenue Utilisateur {session.user.email}</Heading>
        <Heading as='h2'>Vos Reclamations:</Heading>
        <VStack>
            <Accordion allowToggle>
                {reclamElem}
            </Accordion>
        
        </VStack>
        </>
    )
  }
}

  export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    console.log(session);
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