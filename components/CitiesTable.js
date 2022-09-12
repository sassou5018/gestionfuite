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
    Text,
} from '@chakra-ui/react';
import { DeleteIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';


export default function DistrictsTable({ citiesData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const toast = useToast();
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            city_id: citiesData._id,
            city_name: event.target.city_name.value,
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/cities'

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

    const handleDelete = async (event) => {
        event.preventDefault()

        const data = {
            city_id: citiesData._id,
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/cities'

        const options = {
            method: 'DELETE',
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
            <Td>{citiesData.city_name}</Td>
            <Td>{citiesData.admin_name? citiesData.admin_name : "Unavailable"}</Td>
            <Td>{citiesData.population? citiesData.population : "Unavailable"}</Td>
            <Td>
                <Button size='sm' colorScheme='gray' onClick={onOpen}>Edit</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <FormLabel htmlFor="city_name">City Name</FormLabel>
                                <Editable defaultValue={citiesData.city_name}>
                                    <EditablePreview />
                                    <EditableInput name='city_name' />
                                </Editable>
                                <Button size='sm' colorScheme='blue' leftIcon={<RepeatIcon/>} type='submit'>Update</Button>
                                <Button size='sm' colorScheme='red' leftIcon={<DeleteIcon/>} onClick={handleDelete} disabled>Delete</Button>
                                <Button size='sm' colorScheme='gray' onClick={onClose} leftIcon={<CloseIcon/>}>Cancel</Button>
                                <Text size='sm' color='red'>PS: Deleting Cities Breaks the reclamation Tab...</Text>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );
    
}