import Head from "next/head";
import Link from "next/link";
import { ProfileForm } from '../../components/my_form';

export default function convert_now() {
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Convert Now</h1>
          <p className="text-lg mb-8">Choose a plan below to get started:</p>
          {/* Pricing information */}
          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-2">Pricing Plans</h2>
            <ul className="list-disc pl-4">
              <li>Video Length: $5</li>
              <li>Video Length: $5</li>
              <li>Video Length: $5</li>
            </ul>
          </div>
          {/* Profile Form */}
          <ProfileForm />
        </div>
      </main>
    </>
  );
}
