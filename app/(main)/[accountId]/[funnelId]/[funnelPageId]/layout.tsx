import Image from "next/image";
import type { ReactNode } from "react";
import { Nav } from "./components/Nav";

import "@/app/styles/globals.css";
import { db } from "@/lib/db";
import { StoreProvider } from "@/app/StoreProvider";

interface Props {
  readonly children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  // const pageDetails = await db.element.findUnique({ where: { id: 1 } });
  // console.log("These are the details ",  pageDetails)
  
  return (
    <StoreProvider>
      <html lang="en">
        <body className="h-screen overflow-y-hidden">
            <main className="h-full">{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
