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
    Heading,
    Box,
    InputGroup,
    Input,
    InputLeftElement,
} from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from '@chakra-ui/react'
import Reclam from './Reclam';
import { DeleteIcon, CloseIcon, RepeatIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReclamForm from './ReclamForm';


export default function UsersTab({ userData, cities, districts, currentUser }) {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isCheckOpen, onOpen: onCheckOpen, onClose: onCheckClose } = useDisclosure();
    const { isOpen: isAddOpen, onOpen: onAddkOpen, onClose: onAddClose } = useDisclosure();
    const [userReclams, setUserReclams] = useState([]);
    const [SearchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const toast = useToast();
    const handleCheckOpen = async () => {
        console.log('userData', userData);
        const data = {
            reclamations: userData._doc.reclamations
        }
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/getUserReclams';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options);
        const result = await response.json();
        console.log('result', result);
        setUserReclams(result.reclams);
        onCheckOpen();
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.email.value,
            pwd: event.target.pwd.value,
            userType: event.target.userType.value,
            user_id: userData._doc._id
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


    const handleDelete = async (event) => {
        event.preventDefault()

        const data = {
            user_id: userData._doc._id
        }
        //console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/users'

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
    let userReclamsElem;
    if (userReclams != []) {
        userReclamsElem = userReclams.filter(val=>{
            if(SearchTerm==''){
                return val; 
            } else if (val.city.city_name.toLowerCase().includes(SearchTerm.toLowerCase())){
                return val;
            } else if (val.district.nom_district.toLowerCase().includes(SearchTerm.toLowerCase())){
                return val;
            }
        }).map((reclam) => {
            async function handleClick(e) {
                e.preventDefault();
                const fetchData = {
                    email: userData._doc.email,
                    reclamation_id: reclam._id.toString()
                }
                console.log(fetchData);
                const endpoint = '/api/pullReclamation';
                const options = {
                    method: 'DELETE',
                    Headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(fetchData)
                }
                const response = await fetch(endpoint, options);
                const result = await response.json();
                if (result.error) {
                    toast({
                        title: result.error,
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    })
                } else {
                    console.log(result);
                    toast({
                        title: 'Successfully deleted',
                        status: 'success',
                        duration: 6000,
                        isClosable: true
                    })
                    router.replace(router.asPath);
                    onCheckClose();
                }

            }
            return (
                <AccordionItem key={reclam._id}>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                Reclamation id: {reclam._id}, City: {reclam.city.city_name}, District: {reclam.district!=null ? reclam.district.nom_district: "Unavailable"}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Reclam key={reclam._id} description={reclam.description} city={reclam.city} district={reclam.district} time={reclam.time} progress={reclam.progress} id={reclam._id} onCheckClose={onCheckClose} />
                        <Button colorScheme='red' onClick={handleClick} leftIcon={<DeleteIcon />}>Delete</Button>
                    </AccordionPanel>
                </AccordionItem>
            )
        })
    }




    //console.log('userData', userData._doc._id);
    return (
        <Tr>
            <Td>{currentUser==userData._doc.email? "Vous:": ""} {userData._doc.email}</Td>
            <Td>{userData._doc.userType}</Td>
            <Td>{userData.nombreReclam}</Td>
            <Td>
                <Button size='sm' colorScheme='gray' onClick={onEditOpen}>Edit</Button>
                <Modal isOpen={isEditOpen} onClose={onEditClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update {userData._doc.email}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Editable defaultValue={userData._doc.email}>
                                    <EditablePreview />
                                    <EditableInput name='email' type='email' />
                                </Editable>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Editable defaultValue={userData._doc.pwd}>
                                    <EditablePreview />
                                    <EditableInput name='pwd' />
                                </Editable>
                                <FormLabel htmlFor="userType">User Type
                                    <Select name='userType' defaultValue={userData._doc.userType}>
                                        <option value='normalUser' >Normal User</option>
                                        <option value='Admin' >Admin</option>
                                    </Select>
                                </FormLabel>
                                <Button size='sm' colorScheme='blue' leftIcon={<RepeatIcon />} type='submit'>Update</Button>
                                <Button size='sm' colorScheme='red' leftIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
                                <Button size='sm' colorScheme='gray' onClick={onEditClose} leftIcon={<CloseIcon />}>Cancel</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
            <Td>
                <Button size='sm' colorScheme='teal' onClick={handleCheckOpen}>Voir Reclamations</Button>
                <Modal isOpen={isCheckOpen} onClose={onCheckClose} size='full'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Reclamations de: {userData._doc.email}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box overflow='auto'>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
                                    <Input placeholder='Flter By City Name Or District Name' onChange={e => { setSearchTerm(e.target.value) }} />
                                </InputGroup>
                                <Accordion allowToggle>
                                    {userReclams.length === 0 ? <Heading color='red'>No Reclamations</Heading> : userReclamsElem}
                                </Accordion>
                                <Button leftIcon={<AddIcon />} marginTop='15px' onClick={onAddkOpen}>Add Reclamation</Button>
                                <Modal isOpen={isAddOpen} onClose={onAddClose}>
                                    <ReclamForm cities={cities} districts={districts} email={userData._doc.email} onAddClose={onAddClose} onCheckClose={onCheckClose} />
                                </Modal>
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );

}