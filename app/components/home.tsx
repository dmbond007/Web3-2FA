import { signIn, signOut } from "@/auth"
import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-lobster bg-cover">
        <div className="w-full max-w-md bg--white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">AbstractLobsterBank</h2>
          <form
            action={async () => {
              "use server"
              await signIn("Credentials", { redirectTo: "/2fa" })
            }}
          >
            <button type="submit"
              className="w-full bg-black text-white my-3 py-3 rounded-lg hover:bg-sky-600 transition">
              Sign in</button>
          </form><form
            action={async () => {
              "use server"
              await redirect('/register')
            }}
          >
            <button type="submit"
              className="w-full bg-black text-white my-3 py-3 rounded-lg hover:bg-sky-600 transition">
              Sign up</button>åååååå
          </form>
        </div>
      </div></>

  )
}
