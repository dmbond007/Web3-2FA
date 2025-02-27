import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {PrismaClient} from "@prisma/client"
import {PrismaAdapter} from "@auth/prisma-adapter"
export const runtime = 'nodejs';
declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    address: string | undefined
    cleared2Fa?: boolean | undefined
    nonce: string
  }
}

export const prisma = new PrismaClient()
 
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Credentials({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {


        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string } 
        })
        
        if (! user){
          return null;
        }
        
        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password)

 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
        // return user object with their profile data
        return {name: user.fname as string,
          address: user.wallet as string,
          id: user.login as string,
          cleared2Fa : false, 
          nonce: "",
          email: user.email
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.cleared2Fa = user.cleared2Fa
        token.nonce = user.nonce
        token.email = user.email
      }
      if (trigger === "update") {
        token.cleared2Fa = session.user.cleared2Fa
        token.nonce = session.user.nonce
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.cleared2Fa = token.cleared2Fa as boolean
      session.user.nonce = token.nonce as string
      session.user.email = token.email as string
      return session
    },
  },
})