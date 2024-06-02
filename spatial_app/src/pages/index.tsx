import { useState, useEffect } from 'react';
import Layout from '../../src/components/Layout';
import { Button } from "../../src/components/ui/button"
import Link from 'next/link';

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
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10 p-8 rounded-lg">
                <h1 className="text-core_heading text-white font-semibold text-4xl mt-[-20%]">
                  {valuePropositions[index]}
                </h1>
                <p className="mt-8 text-4xl text-white">
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
