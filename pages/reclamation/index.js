import { VStack, Input, Select, Toast, useToast, FormLabel, AlertDialogCloseButton, Button } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { getCity } from '../../utils/citiesGetSet';
import { getDistrict } from '../../utils/districtsGetSet';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
function Reclamation({ cities, districts, error }) {
    const toast = useToast()
    const [lienReclam, setLienReclam] = useState('');
    //console.log(cities)

    const cityElem = cities.map(cite => {
        //console.log(cite._id)
        return (
            <option key={cite._id} value={cite._id}>{cite.city_name}</option>
        )
    })


    const districtElem = districts.map(dist => {
        return (
            <option key={dist._id} value={dist._id}>{dist.nom_district}</option>
        )
    })



    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const data = {
          email: event.target.email.value,
          city: event.target.city.value,
          district: event.target.district.value,
          description: event.target.description.value,

        }
    
        const JSONdata = JSON.stringify(data)
    
        const endpoint = '/api/addReclamation'
    
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
    

        const response = await fetch(endpoint, options)
    

        const result = await response.json()
        if (result.message) {
            toast({
                title: result.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
            setLienReclam(result.lienReclam);
        } else {
            toast({
                title: result.error,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
        }
      }

    return (
        <>
            <Head>
                <title>Creez Une Reclamation</title>
            </Head>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <VStack>
                    <FormLabel>Votre Addresse Email
                        <br />
                        <Input placeholder='utilisateur@email.com' width="250px" type="email" name="email" required />
                    </FormLabel>
                    <FormLabel>Description
                        <br />
                        <Input placeholder='description' width="250px" name='description' required />
                    </FormLabel>

                    <FormLabel>Cit?? de la fuite
                        <br />
                        <Select width="250px" placeholder="Cit??" name='city' required>
                            {cityElem}
                        </Select>
                    </FormLabel>

                    <FormLabel>Le District Le Plus Proche
                        <br />
                        <Select width="250px" placeholder="District" name='district' required>
                            {districtElem}
                        </Select>
                        <Button colorScheme='blue' mt={4} type="submit">Soumettre La Reclamation</Button>
                    </FormLabel>
                    {lienReclam !="" ? <Link href={lienReclam} >Consultez</Link> : null}

                </VStack>
            </form>
        </>
    )
}

export const getServerSideProps = async () => {
    const citiesFetch = await getCity({ body: {} });
    const districtsFetch = await getDistrict({ body: {} });
    return {
        props: {
            cities: JSON.parse(JSON.stringify(citiesFetch)),
            districts: JSON.parse(JSON.stringify(districtsFetch))
        }
    }

};

export default Reclamation