import { Card, CardContent } from "../../../src/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../src/components/ui/carousel"

export default function CarouselSize() {
  return (
    <div className="flex justify-center items-center h-screen"> {/* Center the entire component */}
      <Carousel
        opts={{
          align: "center", // Align carousel content to center
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-10 text-center"> {/* Increase padding to increase size */}
                    <span className="text-3xl font-semibold">TT</span>
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
