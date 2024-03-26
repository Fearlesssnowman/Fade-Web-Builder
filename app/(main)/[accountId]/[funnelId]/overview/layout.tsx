import { ReactNode } from "react";

interface Props {
    readonly children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
    return (
        <html lang="en">
          <body className="h-screen bg-gray-800 flex justify-center items-center">
              <main>{children}</main>
          </body>
        </html>
    );
  }
  