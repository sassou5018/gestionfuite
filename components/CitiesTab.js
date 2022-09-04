import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useDisclosure,
    FormLabel,
    Select,
    useToast
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import CitiesTable from './CitiesTable';
import { useRouter } from 'next/router';


export default function CitiesTab({ cities }) {
    const [SearchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const router = useRouter();


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            city_name: event.target.city_name.value,
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/cities'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }


        const response = await fetch(endpoint, options)


        const result = await response.json()
        console.log('result', result);
        if (result.message) {
            toast({
                title: result.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
            router.replace(router.asPath);
        } else if (result.error) {
            toast({
                title: result.error,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    


    const citiesElement = cities.filter((val) => {
        if (SearchTerm === '') {
            return val;
        } else if (val.city_name.toLowerCase().includes(SearchTerm.toLowerCase())) {
            return val;
        }
    }).map(city => {
        return <CitiesTable key={city._id} citiesData={city} />
    })
    return (
        <div>
            <InputGroup>
                <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
                <Input placeholder='Filter By City Name' onChange={e => { setSearchTerm(e.target.value) }} />
            </InputGroup>
            <TableContainer>
                <Box overflowY="scroll" maxHeight='80vh'>
                <Table>
                    <TableCaption>Cities</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Cité</Th>
                            <Th>Nom Administratif</Th>
                            <Th>Population</Th>
                            <Th>Edit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {citiesElement}
                    </Tbody>
                </Table>
                </Box>
            </TableContainer>
            <Button leftIcon={<AddIcon />} colorScheme='green' onClick={onOpen}>Add City</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New City</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit} >
                            <FormLabel htmlFor='city_name'>City Name
                                <Input name='city_name' placeholder='City Name'/>
                            </FormLabel>
                            <Button size='sm' colorScheme='green' leftIcon={<AddIcon />} type='submit'>Add</Button>
                            <Button size='sm' colorScheme='gray' onClick={onClose} leftIcon={<CloseIcon />}>Cancel</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}