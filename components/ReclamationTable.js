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
    Select,
    Toast,
    useToast,
    Center,
} from '@chakra-ui/react';
import { DeleteIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Reclam from './Reclam';


export default function ReclamationTable({ reclamationData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const toast = useToast();
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.email.value,
            pwd: event.target.pwd.value,
            userType: event.target.userType.value,
            user_id: userData.id
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/users'

        const options = {
            method: 'PUT',
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




    return (
        <Tr>
            <Td>{reclamationData.id}</Td>
            <Td>{reclamationData.city.city_name}</Td>
            <Td>{reclamationData.district.nom_district}</Td>
            <Td>{reclamationData.progress}%</Td>
            <Td>
                <Button variantColor="teal" onClick={onOpen}> Open </Button>
                
                <Modal isOpen={isOpen} onClose={onClose} size='full'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader><Center height='5vh'>Reclamation id: {reclamationData.id}</Center></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Center height='80vh'>
                            <Reclam description={reclamationData.description} city={reclamationData.city} district={reclamationData.district} time={reclamationData.time} progress={reclamationData.progress} id={reclamationData.id} />
                            </Center>
                        </ModalBody>
                        <ModalFooter>
                            <Button variantColor="teal" onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );
    
}