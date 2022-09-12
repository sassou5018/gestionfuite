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
import UsersTable from './UsersTable';
import { useRouter } from 'next/router';


export default function UsersTab({ users, cities, districts, currentUser }) {
    const [SearchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const router = useRouter();


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.email.value,
            pwd: event.target.pwd.value,
            userType: event.target.userType.value
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/users'

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



    const userElement = users.filter((val) => {
        if (SearchTerm === '') {
            return val;
        } else if (val._doc.email.toLowerCase().includes(SearchTerm.toLowerCase())) {
            return val;
        } else if (val._doc.userType.toLowerCase().includes(SearchTerm.toLowerCase())) {
            return val;
        }
    }).map(user => {
        //console.log('user', user);
        return <UsersTable key={user._doc._id} userData={user} cities={cities} districts={districts} currentUser={currentUser} />
    })
    return (
        <div>
            <InputGroup>
                <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
                <Input placeholder='Flter By User Email Or User Type' onChange={e => { setSearchTerm(e.target.value) }} />
            </InputGroup>
            <TableContainer>
            <Box overflowY="scroll" maxHeight='80vh'>
                <Table>
                    <TableCaption>Users</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>User Type</Th>
                            <Th>Nombre de Reclamations</Th>
                            <Th>Edit</Th>
                            <Th>Voir Reclamations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userElement}
                    </Tbody>
                </Table>
            </Box>
            </TableContainer>
            <Button leftIcon={<AddIcon />} colorScheme='green' onClick={onOpen}>Add User</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit} >
                            <FormLabel htmlFor='email'>Email
                                <Input id='email' name='email' placeholder='user@email.com' type='email' />
                            </FormLabel>
                            <FormLabel htmlFor='password'>Password
                                <Input id='pwd' name='pwd' placeholder='********' type='password' />
                            </FormLabel>
                            <FormLabel htmlFor="userType">User Type
                                <Select name='userType'>
                                    <option value='normalUser'>Normal User</option>
                                    <option value='Admin'>Admin</option>
                                </Select>
                            </FormLabel>
                            <Button size='sm' colorScheme='green' leftIcon={<AddIcon />} type='submit'>Add</Button>
                            <Button size='sm' colorScheme='red' leftIcon={<DeleteIcon />}>Delete</Button>
                            <Button size='sm' colorScheme='gray' onClick={onClose} leftIcon={<CloseIcon />}>Cancel</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}