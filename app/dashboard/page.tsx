import { auth } from "../../auth"
import { redirect } from 'next/navigation'

export default async function Test() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>
    if (!session.user?.cleared2Fa) {
      redirect('/signout')
    }

    const currentDate = new Date().toUTCString();
    const greeting = "Hello, SSR Component!";
   
    return (
      <div>
        <h1>{greeting}</h1>
        <p>
          This component is server-side rendered (SSR) and displays the current
          date:
        </p>
        <p>{currentDate}</p>
        <p>{session.user?.cleared2Fa ? "true": "false"}</p>
      </div>
    );
  }