import { Card, CardContent } from "../../../src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../src/components/ui/carousel";

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

export default function CarouselSize() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Video Transformation App</h1>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-2xl"
      >
        <CarouselContent>
          {cardContents.map((content, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="custom-card-bg">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
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
  )
}
