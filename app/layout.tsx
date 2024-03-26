import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import { Toaster } from "sonner";

interface Props {
  readonly children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  // const pageDetails = await db.element.findUnique({ where: { id: 1 } });
  const pageDetails = {}
  console.log("These are the details ",  pageDetails)
  return (
    <StoreProvider>
      <html lang="en">
        <body className="h-screen overflow-y-hidden">
            <main className="h-full">{children}</main>
            <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
