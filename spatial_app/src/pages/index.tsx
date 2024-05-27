import { useState, useEffect } from 'react';
import Layout from '../../src/components/Layout';
import { Button } from "../../src/components/ui/button"
import Link from 'next/link';
import { Card, CardContent } from "../../src/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../src/components/ui/carousel"
 
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
            <div className="pr-12">
              <h1 className="text-white font-semibold text-6xl mt-[-20%]">
                Convert any 2D video 
                to Spatial Video for your Apple Vision Pro 
              </h1>
              <p className="mt-8 text-4xl font-bold text-rainbow">
                {valuePropositions[index]}
              </p>
              <div className="mt-8">
                <Button asChild className="text-white bg-blue-600 px-8 py-4 rounded-lg text-black">
                  <Link href="/convert_now">
                    Convert Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 text-center">
            <div className="pl-12">
              <img src="/demo-image.jpg" alt="Demo Image" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  const valuePropositions: string[] = [
    "Experience memories in depth like never before",
    "Unlock the depth of your videos with Spatial Depth",
  ];

  return (
    <Layout title="Spatial App">
      <Hero valuePropositions={valuePropositions} />
    </Layout>
  );
};

export default IndexPage;
