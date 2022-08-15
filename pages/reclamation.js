import { VStack, Input, Select, Toast, useToast, FormLabel, AlertDialogCloseButton} from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import Head from 'next/head'
import axios from 'axios'
import { getCity } from '../utils/citiesGetSet';
import { getDistrict } from '../utils/districtsGetSet';
function Reclamation({ cities, districts, error }){
    const toast = useToast()
    
    //console.log(cities)
    
    const cityElem = cities.map(cite=>{
        //console.log(cite.id)
        return(
            <option key={cite._id} value={cite._id}>{cite.city_name}</option>
        )
    })


    const districtElem = districts.map(dist=>{
        return (
            <option key={dist._id} value={dist._id}>{dist.nom_district}</option>
        )
    } )


    return(
        <>
        <Head>
            <title>Creez Une Reclamation</title>
        </Head>
        <VStack>
            <FormLabel>Votre Addresse Email
                <br/>
                <Input placeholder='utilisateur@email.com' width="250px" type="email"/>
            </FormLabel>
            <FormLabel>Emplacement de la fuite
                <br/>
                <Input placeholder='rue, municipalité' width="250px"/>
            </FormLabel>

            <FormLabel>Cité de la fuite
                <br/>
                <Select width="250px" placeholder="Cité">
                    {cityElem}
                </Select>
            </FormLabel>
            
            <FormLabel>Le District Le Plus Proche
                <br/>
                <Select width="250px" placeholder="District">
                    {districtElem}
                </Select>
            </FormLabel>
            
            
        </VStack>
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