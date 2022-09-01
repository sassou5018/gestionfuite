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
    FormLabel
} from '@chakra-ui/react';
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
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} >
                                Delete User
                            </Button>
                            <Button colorScheme='blue'>Update User</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    )
}