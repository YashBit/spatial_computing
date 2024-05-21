import { useState, useEffect } from 'react';
import Layout from '../../src/components/Layout';

const Hero: React.FC<{ valuePropositions: string[] }> = ({ valuePropositions }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % valuePropositions.length);
    }, 2950);
    return () => clearInterval(interval);
  }, [valuePropositions.length]);

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')" }}>
        <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="pr-12">
              <h1 className="text-white font-semibold text-5xl">
                {valuePropositions[index]}
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Use Depth Convert to transform any 2D video 
                to Spatial Video for your Apple Vision Pro 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  const valuePropositions: string[] = [
    "Convert your cherished 2D videos to spatial videos for your Apple Vision Pro",
    "Experience immersive memories like never before",
    "Unlock the depth of your videos with Spatial Depth",
  ];

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Hero valuePropositions={valuePropositions} />
    </Layout>
  );
};

export default IndexPage;
