import { useState, useEffect } from 'react';
import Layout from '../../src/components/Layout';
import { Button } from "../../src/components/ui/button"
import Link from 'next/link';
import { Card, CardContent } from "../../src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../src/components/ui/carousel";

const IndexPage: React.FC = () => {
  const valuePropositions: string[] = [
    "Unlock the depth of your videos with Spatial Depth",
  ];

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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % valuePropositions.length);
    }, 4950);
    return () => clearInterval(interval);
  }, [valuePropositions.length]);

  return (
    <Layout title="Spatial App">
      <div className="flex flex-col justify-center items-center min-h-screen py-16">
        <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-8">
          <h1 className="text-5xl font-bold text-center text-core_heading">{valuePropositions[index]}</h1>
        </div>
    

        <div className="mt-16 container mx-auto">
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full max-w-2xl mx-auto"
          >
            <CarouselContent>
              {cardContents.map((content, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="custom-card-bg">
                      <CardContent className="custom-card-content text-white flex flex-col items-center justify-center p-4 text-center">
                        <h2 className="text-xl font-bold mb-4">{content.header}</h2>
                        <p className="text-lg">{content.paragraph}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-8 text-center">
          <Button asChild className="text-white bg-button_color px-12 py-6 rounded text-xl">
            <Link href="/convert_now">
              Start Now 
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
