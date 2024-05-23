import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import Image from 'next/image';
import "~/styles/globals.css";
import bg from './//../../public/avp2.jpg'
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <div className="relative min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${bg.src})` }}>
        <Navbar />
        {/* <Image
          src="/avp.jpg" // Path to your image in the public directory
          alt="Apple Vision Pro" // Alt text for accessibility
          layout="fill" // Fill the container with the image
          objectFit="cover" // Cover the container with the image
        /> */}
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
