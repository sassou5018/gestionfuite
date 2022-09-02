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
    Select
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import DistrictsTable from './DistrictsTable';


export default function DistrictsTab({ districts, cities }) {
    const [SearchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            nom_district: event.target.nom_district.value,
            city: event.target.city.value,
            code_district: event.target.code_district.value,
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/districts'

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

    


    const districtElement = districts.filter((val) => {
        if (SearchTerm === '') {
            return val;
        } else if (val.nom_district.toLowerCase().includes(SearchTerm.toLowerCase())) {
            return val;
        } else if (val.code_district.toString()===SearchTerm) {
            return val;
        } else if (val.city.city_name.toLowerCase().includes(SearchTerm.toLowerCase())) {
            return val;
        }
    }).map(district => {
        return <DistrictsTable key={district.id} districtData={district} cities={cities} />
    })
    const cityElem= cities.map(city => {
        return <option key={city.id} value={city.id}>{city.city_name}</option>
    } )
    return (
        <div>
            <InputGroup>
                <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
                <Input placeholder='Filter By District Name or District Code or City' onChange={e => { setSearchTerm(e.target.value) }} />
            </InputGroup>
            <TableContainer>
                <Table>
                    <TableCaption>Districts</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nom District</Th>
                            <Th>Cité Du District</Th>
                            <Th>Code Du District</Th>
                            <Th>Edit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {districtElement}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button leftIcon={<AddIcon />} colorScheme='green' onClick={onOpen}>Add District</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit} >
                            <FormLabel htmlFor='nom_district'>Nom Du District
                                <Input name='nom_district' placeholder='Nom Du District'/>
                            </FormLabel>
                            <FormLabel htmlFor='code_district'>Code Du District
                                <Input name='code_district' placeholder='Code Du District'/>
                            </FormLabel>
                            <FormLabel htmlFor="userType">City
                                <Select name='userType'>
                                    {cityElem}
                                </Select>
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