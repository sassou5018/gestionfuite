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
            nom_district: event.target.nom_district.value,
            city: event.target.city.value,
            code_district: event.target.code_district.value,
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/districts'

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
            code_district: districtData.code_district
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/districts'

        const options = {
            method: 'DELTE',
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
                                <FormLabel htmlFor="nom_district">Nom District</FormLabel>
                                <Editable defaultValue='1'>
                                    <EditablePreview />
                                    <EditableInput name='nom_district' />
                                </Editable>
                                <FormLabel htmlFor="code_district">Code District</FormLabel>
                                <Editable defaultValue='1'>
                                    <EditablePreview />
                                    <EditableInput name='code_district'/>
                                </Editable>
                                <FormLabel htmlFor="city">City
                                <Select name='city'>
                                    
                                </Select>
                                </FormLabel>
                                <Button size='sm' colorScheme='blue' leftIcon={<RepeatIcon/>} type='submit'>Update</Button>
                                <Button size='sm' colorScheme='red' leftIcon={<DeleteIcon/>} onclick={handleDelete}>Delete</Button>
                                <Button size='sm' colorScheme='gray' onClick={onClose} leftIcon={<CloseIcon/>}>Cancel</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );
    
}