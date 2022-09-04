import { Box, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, VStack, FormLabel, Input, Select, Toast, useToast, Button } from '@chakra-ui/react';
import { SearchIcon, AddIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ReclamForm({cities, districts, email, onAddClose, onCheckClose}) {
    const toast = useToast()
    const [lienReclam, setLienReclam] = useState('');
    const router = useRouter();
    //console.log(cities)

    const cityElem = cities.map(cite => {
        //console.log(cite._id)
        return (
            <option key={cite._id} value={cite._id}>{cite.city_name}</option>
        )
    })


    const districtElem = districts.map(dist => {
        return (
            <option key={dist._id} value={dist._id}>{dist.nom_district}</option>
        )
    })



    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const data = {
          email: email,
          city: event.target.city.value,
          district: event.target.district.value,
          description: event.target.description.value,

        }
    
        const JSONdata = JSON.stringify(data)
    
        const endpoint = '/api/addReclamation'
    
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
    

        const response = await fetch(endpoint, options)
    

        const result = await response.json()
        if (result.message) {
            toast({
                title: 'Success',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
            setLienReclam(result.lienReclam);
            router.replace(router.asPath);
            onAddClose();
            onCheckClose();
        } else {
            toast({
                title: result.error,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
        }
      }

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ajouter Une Reclamation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <VStack>
                                <FormLabel>Description
                                    <br />
                                    <Input placeholder='description' width="250px" name='description' required />
                                </FormLabel>

                                <FormLabel>Cité de la fuite
                                    <br />
                                    <Select width="250px" placeholder="Cité" name='city' required>
                                        {cityElem}
                                    </Select>
                                </FormLabel>

                                <FormLabel>Le District Le Plus Proche
                                    <br />
                                    <Select width="250px" placeholder="District" name='district' required>
                                        {districtElem}
                                    </Select>
                                    <Button colorScheme='blue' mt={4} type="submit">Soumettre La Reclamation</Button>
                                </FormLabel>
                                {lienReclam != "" ? <Link href={lienReclam} target="_blank" passHref><a target="_blank" rel="noopener noreferrer">Consultez</a></Link> : null}

                            </VStack>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </>
    )
}