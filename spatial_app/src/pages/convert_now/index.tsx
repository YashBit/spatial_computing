

/*

    Make sure to limit the video size
    Video check is very important
    1. If the user has repeated the same video

*/

import Head from "next/head";
import Link from "next/link";
import ProfileForm from '../../components/my_form';

export default function convert_now() {
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main  className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-[#9B2929] to-[#383E78]">
        <ProfileForm></ProfileForm>
      </main>
    </>
  );
}
