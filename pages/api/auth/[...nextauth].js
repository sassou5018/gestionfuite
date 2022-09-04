import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import users from '../../../utils/dbModels/users';
import connectMongo from '../../../utils/connectMongo';
import reclamations from '../../../utils/dbModels/reclamations';

export const authOptions = {
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
                try{
                    connectMongo();
                } catch(err){
                    console.log(err);
                    throw new Error('Error Connecting to Database try again later');
                }
                const user = await users.findOne({ email: credentials.email }).populate('reclamations');
                if (!user) {
                    throw new Error('User not found');
                }
                if (user.pwd !== credentials.password) {
                    throw new Error('Password is incorrect');
                }
                return { email: user.email  };
            }

        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            //console.log('session', session);
            //console.log('user', user);
            //console.log('token', token);
            const foundUser= await users.findOne({ email: session.user.email });
           //console.log('foundUser', foundUser);
          session.user.role = foundUser.userType; // Add role value to user object so it is passed along with session
          return session;
      },
    }
}

export default NextAuth(authOptions);