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
import ReclamationTable from './ReclamationTable';


export default function ReclamationsTab({ reclamations }) {
    const [SearchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.email.value,
            pwd: event.target.pwd.value,
            userType: event.target.userType.value
        }
        //console.log('data', data);

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



    const reclamationElement = reclamations.filter((val) => {
        if (SearchTerm === '') {
            return val;
        } else if (val.city.city_name.toLowerCase().includes(SearchTerm.toLowerCase())) {
            return val;
        } else if (val.district.nom_district.toLowerCase().includes(SearchTerm.toLowerCase())){
            return val;
        } else if (val._id.toLowerCase().includes(SearchTerm.toLowerCase())){
            return val;
        }
    }).map(reclam => {
        return <ReclamationTable key={reclam._id} reclamationData={reclam} />
    })
    return (
        <div>
            <InputGroup>
                <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
                <Input placeholder='Filter By City Or District' onChange={e => { setSearchTerm(e.target.value) }} />
            </InputGroup>
            <TableContainer>
            <Box overflowY="scroll" maxHeight='80vh'>
                <Table>
                    <TableCaption>Reclamations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>City</Th>
                            <Th>District</Th>
                            <Th>Progress</Th>
                            <Th>Open</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {reclamationElement}
                    </Tbody>
                </Table>
            </Box>
            </TableContainer>
        </div>
    )
}