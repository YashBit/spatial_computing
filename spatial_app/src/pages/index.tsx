import Head from "next/head";
import Link from "next/link";
import Navbar from '../components/Navbar';
import { Button } from "../components/ui/button"

export default function Home() {
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
      <main className="flex flex-col items-center justify-center bg-gradient-to-l from-[#9B2929] to-[#383E78]">
        <section className="h-screen flex flex-col items-center justify-center">
          <h1>Convert your cherished 2D videos to spatial videos for your Apple Vision Pro</h1>
          {/* You can add more content here */}
        </section>
        <section className="h-screen flex flex-col items-center justify-center">
          <h1>Example Text</h1>
          {/* You can add more content here */}
        </section>
      </main>
    </>
  );
}
