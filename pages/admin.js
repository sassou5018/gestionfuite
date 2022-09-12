import Navbar from '../components/Navbar';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, HStack, Flex, Box } from '@chakra-ui/react';
import UsersTab from '../components/UsersTab';
import ReclamationTab from '../components/ReclamationTab';
import Head from 'next/head';
import DistrictsTab from '../components/DistrictsTab';
import CitiesTab from '../components/CitiesTab';
import cities from '../utils/dbModels/cities';
import districts from '../utils/dbModels/districts';
import users from '../utils/dbModels/users';
import reclamations from '../utils/dbModels/reclamations';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';




export default function Admin({ cities, districts, users, reclamations }) {
    const session = useSession();
    console.log('session', session);
    /*const users=[
        {
            id:1,
            email: 'test@test.com',
            userType: 'normalUser',
            nombreReclam: '1',
            pwd: 'test'
        },
        {
            id:2,
            email: 'test2@test.com',
            userType: 'admin',
            nombreReclam: '2',
            pwd: 'test'
        }
    ]
    const reclams = [
        {
            id:1,
            city:{city_name :'Tunis'},
            description:'test',
            district:{nom_district:'district Nabeul'},
            progress:100,
            time:'2020-01-01'
        },
        {
            id:2,
            city:{city_name :'Sousse'},
            description:'test',
            district:{nom_district:'district Jerba'},
            progress:50,
            time: '2020-01-01'
        }
    ]

    const cities = [
        {city_name :'Tunis', id:1, admin_name:'Tunis', population:100},
        {city_name :'Sousse', id:2, population:100},
        {city_name :'Kairouan', id:3, admin_name:'Kairouan', },
    ]

    const districts = [
        {nom_district:'district Nabeul', id:1, city: cities[0], code_district:1},
        {nom_district:'district Jerba', id:2, city: cities[1], code_district:2},
        {nom_district:'district Kairouan', id:3, city: cities[2], code_district:3},
    ]*/
    if (session.status === 'loading') {
        return <div>Loading...</div>
    }
    if (session.data.user.role !== 'Admin') {
        return (
            <>
                <div>Not Authorized</div>
                <a style={{cursor:'pointer'}} onClick={signOut}>Sign Out</a>
                <br></br>
                <Link href='/'><a>Go Back Home</a></Link>
            </>
        )
    }
    return (
        <Box overflow='hidden'>
            <Head>
                <title>Admin</title>
                <link rel='icon' href='https://www.annuaire.rn.tn/images/sites/803/49/_thumb1/sonede.png' />
            </Head>
            <Navbar />
            <Tabs orientation='vertical' size='lg' height='99vh'>
                <TabList>
                    <Flex direction='column'>
                        <Tab>Users</Tab>
                        <Tab>Reclamations</Tab>
                        <Tab>Districts</Tab>
                        <Tab>Cities</Tab>
                        <HStack marginTop='20vh'>
                            <Button size='sm' colorScheme='red' onClick={signOut}>Sign Out</Button>
                        </HStack>
                    </Flex>

                </TabList>

                <TabPanels>
                    <TabPanel >
                        <UsersTab users={users} cities={cities} districts={districts} currentUser={session.data.user.email}/>
                    </TabPanel>
                    <TabPanel >
                        <ReclamationTab reclamations={reclamations} />
                    </TabPanel>
                    <TabPanel >
                        <DistrictsTab cities={cities} districts={districts} />
                    </TabPanel>
                    <TabPanel >
                        <CitiesTab cities={cities} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}


export async function getServerSideProps(context) {

    const citiesFetch = await cities.find({});
    const districtsFetch = await districts.find({}).populate('city');
    const usersFetch = await users.find({});
    const reclamationsFetch = await reclamations.find({}).populate('city district');
    let usersfetched = usersFetch.map(user => {
        return {
            ...user,
            nombreReclam: user.reclamations.length
        }
    })
    //console.log('usersfetch', usersfetched);
    return {
        props: {
            cities: JSON.parse(JSON.stringify(citiesFetch)),
            districts: JSON.parse(JSON.stringify(districtsFetch)),
            users: JSON.parse(JSON.stringify(usersfetched)),
            reclamations: JSON.parse(JSON.stringify(reclamationsFetch))
        }
    }
}

Admin.auth = {
    role: "Admin",
    unauthorized: "/user", // redirect to this url
}