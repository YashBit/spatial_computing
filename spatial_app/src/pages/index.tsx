import { useState, useEffect } from 'react';
import Layout from '../../src/components/Layout';

const Hero: React.FC<{ valuePropositions: string[] }> = ({ valuePropositions }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % valuePropositions.length);
    }, 4950);
    return () => clearInterval(interval);
  }, [valuePropositions.length]);

  return (
    <div className="relative pt-32 pb-32 flex content-center items-center justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          {/* Left Half (65%) */}
          <div className="w-full lg:w-7/12 px-5 text-center">
            <div className="pr-12">
              <h1 className="text-rainbow font-semibold text-6xl"> {/* Apply rainbow text effect */}
                {valuePropositions[index]}
              </h1>
              <p className="mt-4 text-lg text-rainbow"> {/* Set text color to black */}
                Use Depth Convert to transform any 2D video 
                to Spatial Video for your Apple Vision Pro 
              </p>
            </div>
          </div>
  
          {/* Right Half (35%) */}
          <div className="w-full lg:w-5/12 px-4 text-center">
            <div className="pl-12">
              {/* Add your demo content here */}
              <img src="/demo-image.jpg" alt="Demo Image" className="w-full" />
            </div>
            <div className="pl-12">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  const valuePropositions: string[] = [
    "Convert your cherished videos to spatial videos for your Apple Vision Pro",
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
