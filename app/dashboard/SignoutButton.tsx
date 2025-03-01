"use client";

import { signOut } from "next-auth/react";

export default function SignoutButton() {

    return (
        <button onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-black text-white my-3 py-3 rounded-lg hover:bg-sky-600 transition">
            Sign out
        </button>
    );
}