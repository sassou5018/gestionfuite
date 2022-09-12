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


export default function DistrictsTable({ districtData, cities }) {
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

    const deleteDistrict = async (event) => {
        event.preventDefault()

        const data = {
            code_district: districtData.code_district
        }
        console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/districts'

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


    const cityElem= cities.map(city => {
        return <option key={city._id} value={city._id} selected={city._id==districtData.city._id? true : false}>{city.city_name}</option>
    } )



    return (
        <Tr>
            <Td>{districtData.nom_district}</Td>
            <Td>{districtData.city.city_name? districtData.city.city_name : "Unvailable"}</Td>
            <Td>{districtData.code_district}</Td>
            <Td>
                <Button size='sm' colorScheme='gray' onClick={onOpen}>Edit</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update {districtData.nom_district}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <FormLabel htmlFor="nom_district">Nom District</FormLabel>
                                <Editable defaultValue={districtData.nom_district}>
                                    <EditablePreview />
                                    <EditableInput name='nom_district' />
                                </Editable>
                                <FormLabel htmlFor="code_district">Code District</FormLabel>
                                <Editable defaultValue={districtData.code_district}>
                                    <EditablePreview />
                                    <EditableInput name='code_district'/>
                                </Editable>
                                <FormLabel htmlFor="city">City
                                <Select name='city'>
                                    {cityElem}
                                </Select>
                                </FormLabel>
                                <Button size='sm' colorScheme='blue' leftIcon={<RepeatIcon/>} type='submit'>Update</Button>
                                <Button size='sm' colorScheme='red' leftIcon={<DeleteIcon/>} onClick={deleteDistrict}>Delete</Button>
                                <Button size='sm' colorScheme='gray' onClick={onClose} leftIcon={<CloseIcon/>}>Cancel</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );
    
}