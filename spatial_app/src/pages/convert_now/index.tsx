"use client";

import Head from "next/head";
import Link from "next/link";
import { ProfileForm } from '../../components/my_form';
import * as React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function ConvertNow() {
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen relative">
        <div className="relative z-10 flex w-full max-w-6xl">
          <div className="w-1/2 p-4 relative">
            <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div>
            <Card className="bg-transparent relative z-10 border-none">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-core_heading">Convert Now</CardTitle>
                <CardDescription className="text-lg text-center text-core_heading">Upload 2D Video - Pay - Receive Email with Spatial Video</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </div>
          <div className="w-1/2 p-10 pr-10 left-40 z-20 flex items-center justify-center">
            <img src="/vision_pro_trailer.gif" alt="Description of image" className="rounded-lg" />
          </div>
        </div>
      </main>
    </>
  );
}
