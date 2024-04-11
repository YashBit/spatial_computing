import Head from "next/head";
import Link from "next/link";
import Navbar from '../components/Navbar';
import { Button } from "../components/ui/button";
import {useState, useEffect} from 'react'

export default function Home() {
  const handleClick = () => {
    console.log("Button Clicked");
  };

  const valuePropositions = [
    "Convert your cherished 2D videos to spatial videos for your Apple Vision Pro",
    "Experience immersive memories like never before",
    "Unlock the depth of your videos with Spatial Depth",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(()=>{
      setIndex((prevIndex) => (prevIndex + 1) % valuePropositions.length);

    }, 2950);
    return () => clearInterval(interval);
  }, [valuePropositions.length]);
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center bg-gradient-to-l from-[#9B2929] to-[#383E78]">
        <section className="h-screen flex flex-col items-center justify-center">
          <h1>{valuePropositions[index]}</h1>
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
