import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';


const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials property is used to generate a suitable form on the sign in page.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {

          // if (user) {
          //   return { name: 'Minesota', email: user.email };
          // } else {
          //   return null;
          // }
        } catch (e) {
          throw new Error('There was an error on user authentication');
        }
      },
    }),
  ],

  callbacks: {
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token and user id from a provider.

    //   return session;
    // },
  },

  session: {
    jwt: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default NextAuth(options);
