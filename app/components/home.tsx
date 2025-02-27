import { signIn, signOut } from "@/auth"

export default function Home() {
  return (
    <><form
      action={async () => {
        "use server"
        await signIn("Credentials", { redirectTo: "/2fa" })
      } }
    >
      <button type="submit">Sign in</button>
    </form><form
      action={async () => {
        "use server"
        await signOut()
      } }
    >
        <button type="submit">Sign Out</button>
      </form></>
  )
}
