import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
//import { saltAndHashPassword } from "@/utils/password"

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    cleared2Fa?: boolean | undefined
    nonce: string
  }
}

 
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
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
        let user = null
 
        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = {name: "nikki", address: "1234", id: "234", cleared2Fa: false, nonce: ""}
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.cleared2Fa = user.cleared2Fa
        token.nonce = user.nonce
      }
      if (trigger === "update") {
        console.log('here!')
        token.cleared2Fa = session.user.cleared2Fa
        token.nonce = session.user.nonce
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.cleared2Fa = token.cleared2Fa as boolean
      session.user.nonce = token.nonce as string
      return session
    },
  },
})