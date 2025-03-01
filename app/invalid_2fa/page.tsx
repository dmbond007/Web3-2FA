"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function LogoutPage() {
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      signOut()
    }
  }, [status]);

  return (
    <>
      <p>
        You were signed out, because you have tried to authenticate with an incorrect wallet.
        Go back to <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>home page</a>.
      </p>
    </>
  );
}