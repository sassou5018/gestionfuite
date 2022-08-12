import { VStack, Input, Select, Toast, useToast, FormLabel, AlertDialogCloseButton} from '@chakra-ui/react'
import Head from 'next/head'
import connectMongo from '../utils/connectMongo'
import districts from '../utils/dbModels/districts'
import cities from '../utils/tn.json'
function Reclamation({ districtList, error }){
    const toast = useToast()
    const testElem = districtList.map(test=>{
        return(
            <option key={test._id}>{test.nom_district}</option>
        )
    })
    
    const cityElem = cities.map(cite=>{
        return(
            <option key={cite.population_proper}>{cite.city}</option>
        )
    })

    const gouvernorats = ["Ariana", "Beja", "Ben Arous" ]

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
                    {testElem}
                </Select>
            </FormLabel>
            
            
        </VStack>
        </>
    )
}

export const getServerSideProps = async () => {
    try {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
      const filter = {};
  
      console.log('FETCHING DOCUMENTS');
      const districtList = await districts.find(filter).sort({"nom_district": 1});
      console.log('FETCHED DOCUMENTS');
  
      return {
        props: {
          districtList: JSON.parse(JSON.stringify(districtList)),
        },
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export default Reclamation