import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import { Suspense } from "react";
import Loading from "../Components/loading";
import AvatarChat from "../Components/AvatarChat";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/38`);
  const data = await res.json();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased nunito`}
      >
      <StoreProvider>
          <Header data={data}/>
          <Suspense fallback={<Loading />}>
          <div className="p-5 md:px-12 bg-[#F2F3F7] py-7">
            {children}
            <AvatarChat />
          </div>
          </Suspense>
          <Footer data={data}/>
      </StoreProvider>
      </body>
    </html>
  );
}
