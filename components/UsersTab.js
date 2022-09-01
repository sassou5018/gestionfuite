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
  } from '@chakra-ui/react';
  import UsersTable from './UsersTable';


export default function UsersTab(){
    const users=[
        {
            email: 'test@test.com',
            userType: 'normalUser',
            nombreReclam: '1',
            pwd: 'test'
        },
        {
            email: 'test2@test.com',
            userType: 'Admin',
            nombreReclam: '2',
            pwd: 'test'
        }
    ]

    const userElement = users.map(user => {
        return <UsersTable userData={user}/>
    } )
    return (
        <>
        <TableContainer>
            <Table>
                <TableCaption>Users</TableCaption>
                <Thead>
                    <Th>User Email</Th>
                    <Th>User Type</Th>
                    <Th>Nombre de Reclams</Th>
                    <Th>Edit</Th>
                </Thead>
                <Tbody>
                    {userElement}
                </Tbody>
            </Table>
        </TableContainer>
        </>
    )
}