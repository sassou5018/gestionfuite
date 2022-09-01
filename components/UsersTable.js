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
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    FormLabel,
    Select
} from '@chakra-ui/react';
import { DeleteIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
export default function UsersTab({ userData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Tr>
            <Td>{userData.email}</Td>
            <Td>{userData.userType}</Td>
            <Td>{userData.nombreReclam}</Td>
            <Td>
                <Button size='sm' colorScheme='gray' onClick={onOpen}>Edit</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update {userData.email}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Editable defaultValue={userData.email}>
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Editable defaultValue={userData.pwd}>
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                                <FormLabel htmlFor="userType">User Type
                                <Select>
                                    <option value='normalUser' selected={userData.userType==='normalUser' ? true : false }>Normal User</option>
                                    <option value='admin' selected={userData.userType==='admin' ? true : false }>Admin</option>
                                </Select>
                                </FormLabel>
                                <Button size='sm' colorScheme='blue' leftIcon={<RepeatIcon/>}>Update</Button>
                                <Button size='sm' colorScheme='red' leftIcon={<DeleteIcon/>}>Delete</Button>
                                <Button size='sm' colorScheme='gray' onClick={onClose} leftIcon={<CloseIcon/>}>Cancel</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );
    
}