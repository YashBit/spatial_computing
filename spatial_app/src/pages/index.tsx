import Head from "next/head";
import Link from "next/link";
import Navbar from '../components/Navbar';
import { Button } from "../components/ui/button"

const handleClick = () => {
  console.log("Button Clicked")
};

export default function Home() {
  // Debugging statement to ensure the component renders
  console.log("Home component rendered");

  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-[#9B2929] to-[#383E78]">
        {/* Debugging statement to ensure the Button component renders */}
      </main>
    </>
  );
}