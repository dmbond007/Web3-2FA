import { signIn, signOut } from "@/auth"
import HomeComponent from "./components/home"
import type { NextPage } from 'next';
//import type { BuiltInProviderType } from "next-auth/providers";

const Home: NextPage = () =>  {
  return (
    <>
      <HomeComponent/>
    </>
  )
}

export default Home;
