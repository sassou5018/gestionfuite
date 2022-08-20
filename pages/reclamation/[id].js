import { Flex, Heading } from '@chakra-ui/react';
import Reclam from '../../components/Reclam';
import Head from 'next/head';
import {useRouter} from 'next/router';
import { getOneReclamation } from '../../utils/reclamationsGetSet';

export default function ReclamationId({result}) {
    const router = useRouter();
    const id = router.query.id;
    //console.log(id);
        if (result.error) {
        return(
            <h1>404 Pas De Reclamation Avec l'id:{id} Trouvée</h1>
        )
        }
        else {
            return (
                <>
                <Head>
                    <title>Reclamation {id} </title>
                </Head>
                <Flex justifyContent='center' alignItems='center' >
                    <Reclam id={id} description={result.description} city={result.city} district={result.district} time={result.time} progress={result.progress} />
                </Flex>
                </>
            );
        }

}

export async function getServerSideProps(context) {
    const id = context.query.id;
    const result = await getOneReclamation({body: {reclamation_id: id}})
    console.log(result);
    
    return {
        props: {
            result: JSON.parse(JSON.stringify(result))
        }
    }
}