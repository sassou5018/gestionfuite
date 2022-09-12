import { Box, Divider, Heading, Text, Progress, Image, HStack} from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react';
import Link from 'next/link';






export default function ReclamNoEdit({ description, city, district, time, progress, id }) {
    const dateString = new Date(time).toString();

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
                <Text>District : <Link href={`https://www.google.com/search?q=${district.nom_district? district.nom_district : "Unavailable"}`}>{district.nom_district? district.nom_district : "Unavailable"}</Link></Text>
                <Divider variant='dashed' />
                <Stat>
                    <StatLabel>Progress:</StatLabel>
                    <StatNumber><StatArrow type='increase' /> {progress}%</StatNumber>
                    <StatHelpText>
                        Soumise Le: <Text fontSize='sm'>{dateString}</Text>
                    </StatHelpText>
                    <Progress value={progress} size='sm' hasStripe colorScheme='blue' />
                </Stat>
            </Box>
        </Box>
    )
}

