import { auth } from "../../auth"
import { redirect } from 'next/navigation'
import SignoutButton from "./SignoutButton"

export default async function Test() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>
  if (!session.user?.cleared2Fa) {
    redirect('/invalid_2fa')
  }

  const greeting = "Welcome, to your dashboard, " + session.user.name + "!"

  return (
    <div className="flex min-h-screen items-center justify-center bg-lobster bg-cover">
      <div className="h-4/10 w-full max-w-md bg--white p-8 rounded-2xl shadow-lg">
        <h1 className="text-xl font-bold">{greeting}</h1>
        <p>You can see this page, because you cleared 2-factor authentication.</p>
        <SignoutButton />
      </div>
    </div>
  );
}