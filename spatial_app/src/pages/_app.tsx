import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <Navbar ></Navbar>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
