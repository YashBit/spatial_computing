import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from "../components/ui/button"
import Link from 'next/link';
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
const cardContents = [
  {
    header: "Great Quality",
    paragraph: "Enjoy stunning 3D video transformations with high-definition clarity and vibrant colors that make your videos stand out."
  },
  {
    header: "Affordable Pricing",
    paragraph: "Best prices in the market! Get access to premium video editing features without breaking the bank. "
  },
  {
    header: "Consistent",
    paragraph: "Experience smooth and reliable performance with our app, ensuring that your video transformations are always seamless."
  },
  {
    header: "Upto 2GB or 30 Minutes of 1080p HD Videos",
    paragraph: "Upload upto 2GB of video for conversion. Please send in email through Contact Now page if you require a larger batch to be converted."
  },
  {
    header: "Customer Support",
    paragraph: "Our dedicated support team is here to assist you 24/7 with any questions or issues you may encounter."
  },
];
const Hero: React.FC<{ valuePropositions: string[] }> = ({ valuePropositions }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % valuePropositions.length);
    }, 4950);
    return () => clearInterval(interval);
  }, [valuePropositions.length]);

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 text-center">
            <div className="relative pr-12">
              <div className="absolute absolute-bg inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10 p-8 rounded-lg">
                <h1 className="text-core_heading text-white font-semibold text-5xl mt-[-20%]">
                  {valuePropositions[index]}
                </h1>
                <p className="mt-8 text-2xl off-white-text">
                  Convert any 2D video 
                  to Spatial Video for your Apple Vision Pro 
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 text-center">
            <div className="pl-12">
              <img src="/demo-image.jpg" alt="Demo Image" className="w-full" />
            </div>
            <div className="mt-8">
              <Button asChild className="text-white bg-button_color px-12 py-6 rounded text-xl">
                <Link href="/convert_now">
                  Start Now 
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  const valuePropositions: string[] = [
    "Unlock the depth of your videos with Spatial Depth",
  ];

  return (
    <Layout title="Spatial App">
      <Hero valuePropositions={valuePropositions} />
    </Layout>
  );
};

export default IndexPage;
