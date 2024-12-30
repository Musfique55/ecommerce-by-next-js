import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import AvatarChat from "../Components/AvatarChat";
import { userId } from "./page";
import { Suspense } from "react";
import Loader from "../Components/Loader";

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
  title: "Brother Electronics",
  description: "Get all kind of next gen devices",
  icons : {
    icon : '/favicon-32x32.png'
  }
};



export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{cache : 'no-cache'});
  const data = await res.json();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased nunito`}
      >
      <StoreProvider>
          <Suspense>
          <Header data={data}/>
          <div className="p-5 md:px-12 bg-[#F2F3F7] py-7">
            {children}
            <AvatarChat />
          </div>
          <Footer data={data}/>
          </Suspense>
      </StoreProvider>
      </body>
    </html>
  );
}
