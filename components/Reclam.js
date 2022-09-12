import { Box, Divider, Heading, Text, Progress, Image, HStack, IconButton, Button, FormLabel, Toast, useToast } from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';





export default function Reclam({ description, city, district, time, progress, id, onCheckClose }) {
    const dateString = new Date(time).toLocaleString();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const toast = useToast();
    const [sliderValue, setSliderValue] = useState(progress);
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            description: event.target.description.value,
            progress: event.target.progress.value,
            reclamation_id: id
        }
        console.log('data', data);

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/reclamations'

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
            if (onCheckClose){
                onCheckClose();
            }
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
        <Box width='600px' backgroundColor='#EBF8FF' borderRadius='5px' border='solid' borderWidth='1px' overflow='wrap'>
            <HStack p='5px'>
                <Image src='https://www.annuaire.rn.tn/images/sites/803/49/_thumb1/sonede.png' maxH='50px' />
                <Heading as='h1' size='lg'>Systeme De Reclamation De Fuite</Heading>
            </HStack>
            <Box padding='15px' color='#000000cc'>
                <Heading as='h2'>Reclamation id: {id}</Heading>
                <Text fontSize='xl'>Description: {description}</Text>
                <Divider variant='dashed' />
                <Text>Cité :<Link href={`https://www.google.com/search?q=${city.city_name}`} >{city.city_name}</Link></Text>
                <Text>District : <Link href={`https://www.google.com/search?q=${district !=null? district.nom_district : "Unavailable"}`}>{district !=null? district.nom_district : "Unavailable"}</Link></Text>
                <Divider variant='dashed' />
                <Stat>
                    <StatLabel>Progress:</StatLabel>
                    <StatNumber><StatArrow type='increase' /> {progress}%</StatNumber>
                    <StatHelpText>
                        Soumise Le: <Text fontSize='sm'>{dateString}</Text>
                    </StatHelpText>
                    <Progress value={progress} size='sm' hasStripe colorScheme='blue' />
                </Stat>
                <IconButton icon={<EditIcon />} colorScheme='blue' size='sm' onClick={onOpen} marginTop="15px" >Edit</IconButton>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Reclam: {id}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <FormLabel htmlFor='description'>Description:
                                    <Editable defaultValue={description}>
                                        <EditablePreview />
                                        <EditableInput name='description' required />
                                    </Editable>
                                </FormLabel>
                                <FormLabel htmlFor='progress'>Progress:
                                    <Slider aria-label='slider-ex-1' defaultValue={progress} name='progress' onChange={(v) => setSliderValue(v)} marginTop='50px'>
                                        <SliderMark
                                            value={sliderValue}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                        >
                                            {sliderValue}%
                                        </SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                </FormLabel>
                                <Button colorScheme='red' variant='solid' leftIcon={<CloseIcon />} onClick={onClose} >Close</Button>
                                <Button type='submit' colorScheme='blue' variant='solid'>Save</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    )
}

