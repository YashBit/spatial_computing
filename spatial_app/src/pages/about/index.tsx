import { Card, CardContent } from "../../../src/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../src/components/ui/carousel"

const cardContents = [
  {
    header: "Great Quality",
    paragraph: "Lorem ipsum dolor sit amet"
  },
  {
    header: "Affordable Pricing",
    paragraph: "Sed id mauris consecteturluam."
  },
  {
    header: "Consistent",
    paragraph: "Ut rhoncus vehicula liberore."
  },
  {
    header: "Upto 20GB",
    paragraph: "Vestibulum ante ipsum primis"
  },
  {
    header: "Customer Supports",
    paragraph: "Nullam sed eros dictum "
  },
];

export default function CarouselSize() {
  return (
    <div className="flex justify-center items-center h-screen"> {/* Center the entire component */}
      <Carousel
        opts={{
          align: "center", // Align carousel content to center
        }}
        className="w-full max-w-2xl"
      >
        <CarouselContent>
          {cardContents.map((content, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-3"> {/* Adjust padding to increase size */}
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-12 text-center"> {/* Increase padding to increase size */}
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
