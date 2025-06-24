
import { Roboto } from "next/font/google";
import "./styles/globals.css";
import { ContainerLayout, AuthInitializer } from "@/components";
import {StoreProvider} from "@/store/storeProvider"
import { QueryProvider } from "@/provider/QueryProvider";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Menu | Chef Burguer",
  description: "Aproveite o melhor do nosso cardápio.",
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <QueryProvider>
          <StoreProvider>
            <ContainerLayout>
              <AuthInitializer/>
              {children}
            </ContainerLayout>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}