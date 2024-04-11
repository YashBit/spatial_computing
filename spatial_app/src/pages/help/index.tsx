import Head from "next/head";
import Link from "next/link";

const handleClick = () => {
  console.log("Button Clicked")
};

export default function About() {
  // Debugging statement to ensure the component renders
  console.log("Home component rendered");
  
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-[#9B2929] to-[#383E78]">
        {/* Debugging statement to ensure the Button component renders */}
      <h1>Help Copy</h1>
      </main>
    </>
  ); 
}