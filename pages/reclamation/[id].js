import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getReclamation } from '../../utils/reclamationsGetSet';

export default function ReclamationId({ reclamation }) {
    const router = useRouter();
    const { id } = router.query;
    if (reclamation == null) {
        return (
            <Flex justifyContent="center" alignItems="center">
                <Heading color="red">Aucune réclamation n'a été trouvée avec cet id:{id}</Heading>
            </Flex>
        )
    } else {
        return (
            <div>
                <h1>Reclamation {id}</h1>
                <p>Oui Oui</p>
            </div>
        );
        }

}



export async function getServerSideProps(context){
    const { id } = context.query;
    const reclamation = await getReclamation({body:{'reclamation_id': id}});
    console.log(reclamation)
    return {
        props: {
            reclamation: reclamation
        }
    }

    
}