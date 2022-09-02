import { Box, Button, Heading, HStack, Image, useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Link from "next/link";
export default function Navbar(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const session = useSession();
    return (
        <nav>
        <Box width="100vw" height="8vh" bg="gray.100">
            <HStack>
            <Box>
                <Link href="/">
                    <Image src="https://www.annuaire.rn.tn/images/sites/803/49/_thumb1/sonede.png" maxH="60px" style={{cursor:'pointer'}} />
                </Link>
            </Box>
            <Box>
            <Menu isOpen={isOpen}>
            <MenuButton
                variant="ghost"
                mx={1}
                py={[1, 2, 2]}
                px={4}
                borderRadius={5}
                _hover={{ bg: "blue.100" }}
                aria-label="Courses"
                fontWeight="normal"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
            >
                Espace Utilisateur {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                <Link href="/user">
                <MenuItem>{session.status==='authenticated'? 'Your Account' : 'Sign In'}</MenuItem>
                </Link>
                <Link href="/admin">
                <MenuItem>Admin Dashboard</MenuItem>
                </Link>
            </MenuList>
        </Menu>
            </Box>
            <Box>
                <Link href="/reclamation">
                <Button variant="ghost"
                mx={1}
                py={[1, 2, 2]}
                px={4}
                borderRadius={5}
                _hover={{ bg: "blue.100" }}
                aria-label="Courses"
                fontWeight="normal">Creez Une Reclamation</Button>
                </Link>
            </Box>
            </HStack>
        </Box>
        </nav>
    )
}