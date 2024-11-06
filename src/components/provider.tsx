"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactElement } from "react";

function Provider({ children }: { children: ReactElement }) {
  // const { data: session } = useSession();
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
