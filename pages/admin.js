import Navbar from '../components/Navbar';
import HomeTab from '../components/HomeTab';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, HStack, Flex, Box } from '@chakra-ui/react';
import UsersTab from '../components/UsersTab';



export default function Admin() {
    return (
        <Box overflow='hidden'>
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
                        <Button size='sm' colorScheme='red'>Sign Out</Button>
                    </HStack>
                    </Flex>
                    
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <HomeTab />
                    </TabPanel>
                    <TabPanel>
                        <UsersTab/>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}