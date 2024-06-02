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

export function PricingCard() {
  const payRanges = [
    { minutes: "0-5 minutes", price: "$5" },
    { minutes: "5-10 minutes", price: "$10" },
    { minutes: "10-15 minutes", price: "$15" },
  ];

  return (
    <Card className="w-[350px] relative">
      <div className="absolute inset-0 bg-black opacity-80 rounded-lg"></div>
      <CardHeader className="relative z-10 text-core_heading">
        <CardTitle>Pricing Plans</CardTitle>
        <CardDescription className="off-white-text">Choose a plan that suits your needs.</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 text-white">
        <div className="grid gap-4">
          {payRanges.map((range, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-lg font-semibold">{range.minutes}</span>
              <span className="text-lg">{range.price}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConvertNow() {
  return (
    <>
      <Head>
        <title>Spatial Depth</title>
        <meta name="description" content="Convert any 2D Video to a Spatial Video"/>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex justify-center items-center min-h-screen">
        <div className="flex w-full max-w-6xl items-start relative">
          <div className="absolute inset-y-0 convert-bg bg-black opacity-80 rounded-lg"></div>
          <div className="w-1/2 flex flex-col items-center relative z-10">
            <h1 className="text-3xl font-bold mb-4 text-core_heading">Convert Now</h1>
            <p className="text-lg mb-8 text-core_heading">Upload - Pay - Receive Email</p>
            <ProfileForm />
          </div>
          <div className="w-1/2 flex flex-col items-center mt-8">
            <PricingCard />
          </div>
        </div>
      </main>
    </>
  );
}
