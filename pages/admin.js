import Navbar from '../components/Navbar';
import HomeTab from '../components/HomeTab';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, HStack, Flex, Box } from '@chakra-ui/react';
import UsersTab from '../components/UsersTab';
import Head from 'next/head';



export default function Admin() {
    const users=[
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
    return (
        <Box overflow='hidden'>
            <Head>
                <title>Admin</title>
                <link rel='icon' href='https://www.annuaire.rn.tn/images/sites/803/49/_thumb1/sonede.png'/>
            </Head>
            <Navbar />
            <Tabs orientation='vertical' size='lg' height='99vh'>
                <TabList>
                    <Flex direction='column'>
                    <Tab>Home</Tab>
                    <Tab>Users</Tab>
                    <Tab>Reclamations</Tab>
                    <Tab>Districts</Tab>
                    <Tab>Cities</Tab>
                    <HStack marginTop='50vh'>
                        <Button size='sm' colorScheme='red'>Sign Out</Button>
                    </HStack>
                    </Flex>
                    
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <HomeTab />
                    </TabPanel>
                    <TabPanel>
                        <UsersTab users={users} />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}