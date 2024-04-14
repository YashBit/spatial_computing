

/*

    Make sure to limit the video size
    Video check is very important
    1. If the user has repeated the same video

*/

import Head from "next/head";
import Link from "next/link";
import {ProfileForm2} from '../../components/username_form';
import {ProfileForm} from '../../components/my_form';

export default function convert_now() {
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <div className="absolute top-80 left-60"> {/* Adjust top and left as needed */}
          <ProfileForm /> {/* Render your ProfileForm component here */}
        </div>
      
      </main>
    </>
  );
}