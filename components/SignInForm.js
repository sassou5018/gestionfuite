import { Box, VStack, Input, Button, FormLabel, Flex, useToast} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';



export default function SignInForm() {

    const toast = useToast();

    async function handleSignIn(event) {
        event.preventDefault()
        const res = await signIn('credentials', { email: event.target.email.value, password: event.target.password.value});
        console.log(res);
        if (res.error){
            let message = res.error;
            toast({
                title: 'Error Signing In',
                description: message,
                duration: 9000,
                isClosable: true,
                status: 'error'
            })
     
        }

    }

    return (
        <Flex alignItems="center" justifyContent="center" height="80vh">
            <form onSubmit={handleSignIn}>
            <VStack bgColor='white'>
                <FormLabel htmlFor="email">Email
                        <Input placeholder="Email" type="email" name="email" />
                </FormLabel>
                <FormLabel htmlFor="password">Password
                    <Input placeholder="Password" type="password" name="password" />
                </FormLabel>
                <Button colorScheme="blue" mt={4} type="submit">Sign In</Button>
            </VStack>
            </form>
        </Flex>
    );
    
}