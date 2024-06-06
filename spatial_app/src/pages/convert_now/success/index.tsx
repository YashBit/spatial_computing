import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function About() {
  const router = useRouter();

  // Redirect to main page after 5 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(redirectTimer);
  }, []); // Run only once on component mount

  // Debugging statement to ensure the component renders
  console.log("About component rendered");

  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center z-10">
          <h1 className="text-4xl font-bold text-core_heading">Video Submitted</h1>
        </div>
        <div className="z-20 relative mt-10"> {/* Adjust the margin top to increase the difference */}
          <p className="text-white text-lg">Please hold on, we will send an email asap!</p>
        </div>
      </main>
    </>
  ); 
}
