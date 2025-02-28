import { auth } from "../../auth"
import { redirect } from 'next/navigation'

export default async function Test() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>
    if (!session.user?.cleared2Fa) {
      window.alert("Please use the wallet associated with this account")
      redirect('/signout')
    }

    const currentDate = new Date().toUTCString();
    const greeting = "Welcome, " + session.user.name +"!"
   
    return (
      <div className="flex min-h-screen items-top justify-left bg-lobster bg-cover">
        <div className="h-4/10 w-full max-w-md bg--white p-8 rounded-2xl shadow-lg">
       
        <h1 className="text-xl font-bold">{greeting}</h1>
        <p>
          This component is server-side rendered (SSR) and displays the current
          date:
        </p>
        <p>Signed in at {currentDate}</p>
        <form
                   action={async () => {
                     "use server"
                     await redirect('/signout') 
                   }}
                 >
                   <button type="submit"
                     className="w-full bg-black text-white my-3 py-3 rounded-lg hover:bg-sky-600 transition">
                     Sign out</button>
                 </form>
      </div>
      </div>
    );
  }