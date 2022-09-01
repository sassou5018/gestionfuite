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


export default function UsersTab({ users }){
    

    const userElement = users.map(user => {
        return <UsersTable userData={user}/>
    } )
    return (
        <div>
        <TableContainer>
            <Table>
                <TableCaption>Users</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Email</Th>
                        <Th>User Type</Th>
                        <Th>Nombre de Reclamations</Th>
                        <Th>Edit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userElement}
                </Tbody>
            </Table>
        </TableContainer>
        </div>
    )
}