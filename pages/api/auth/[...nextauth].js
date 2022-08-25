import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import userModel from '../../../utils/dbModels/users';


export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Example@email.com' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (!credentials.email || !credentials.password) {
                    throw new Error('Email and password are required');
                }
                const user = await userModel.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('User not found');
                }
                if (user.pwd !== credentials.password) {
                    throw new Error('Password is incorrect');
                }
                return { email: user.email, userType: user.userType, reclamations: user.reclamations };
            }

        })
    ]
});