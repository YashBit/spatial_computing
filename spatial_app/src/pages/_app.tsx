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
      <div className="relative min-h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')" }}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
