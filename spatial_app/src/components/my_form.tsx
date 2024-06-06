import { useEffect, useState } from 'react'; // Import useEffect and useState hooks
import { useRouter } from 'next/router';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "../components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { uploadFileToS3 } from "../server/services/s3Upload";
import {checkout} from "../server/services/checkout"




export function ProfileForm() {
  const MAX_IMAGE_SIZE = 2147483648; // 2 GB in bytes
  const ALLOWED_VIDEO_TYPES = [
    "video/mov",
    "video/mp4",
    "video/avi",
    "video/*",
  ];

  const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    videos: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Required`)      
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
        `Less than 2GB please.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ALLOWED_VIDEO_TYPES.includes(file.type)
          ),
        "Only these types are allowed .mov, .avi, .mp4"
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  // const [totalDuration, setTotalDuration] = useState(0); // State for storing the total duration of the uploaded videos
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  function videoPriceCalculator(videoLengthInSeconds: number): number {
    const basePrice = 4.75;
    const additionalMinutePrice = 1;
    const videoLengthInMinutes = videoLengthInSeconds / 60;
    const additionalMinutes = Math.max(0, Math.ceil(videoLengthInMinutes - 3));
    const additionalPrice = additionalMinutes * additionalMinutePrice;
    const totalPrice = basePrice + additionalPrice;

    return totalPrice;
  }

  // Stripe Stuff 

  // const stripe = useStripe();
  // const elements = useElements();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const videos = values["videos"];
      const email = values["email"];
      const name = values["name"];
      const bucketName = "spatialapp";
      const folderName = "user_data/";
  
      // Calculate total duration
      let totalDurationInSeconds = 0;
      Array.from(videos).forEach((videoFile) => {
        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(videoFile);
      });
      // NOW CALL STRIPE WITH THE SET PRICE
      checkout({
        lineItems: [
          {
            price: calculatedPrice,
            quantity: 1
          }
        ]
      })
      // Calculate total price
      const totalPrice = videoPriceCalculator(totalDurationInSeconds);
      
      // Proceed with file upload
      // const fileUrl = await uploadFileToS3(videos, email, name, bucketName, folderName);
      // console.log("Uploaded file URL:", fileUrl);
      // router.push("convert_now/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };
  
  
  // const fileUrl = await uploadFileToS3(videos, email, name, bucketName, folderName);

      // console.log("Uploaded file URL:", fileUrl);

      // router.push("convert_now/success");
  return (
    <section className="flex flex-col gap-8 xl:gap-10 text-xlg">
      <Card className="text-black bg-gray-80">
        <CardHeader>
          <CardTitle className="text-center off-white-text">Pricing</CardTitle>
        </CardHeader>
        <CardContent className="text-center off-white-text text-lg">
          <p>Base Price: $4.75 for 3 minutes</p>
          <p>+$1 / minute after base price</p>
          {/* <p>Total Duration: {totalDuration} seconds</p> Display the total duration of the uploaded videos */}
        </CardContent>
      </Card>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 xl:gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-core_heading">Name</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormDescription className="off-white-text">Legal Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-core_heading">Email Address</FormLabel>
                <FormControl>
                  <Input type="email"  {...field} />
                </FormControl>
                <FormDescription className="off-white-text">Please make sure it is correct.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videos"
            render={({ field: { onChange }, ...field }) => {
              const videos = form.watch("videos");

              return (
                <FormItem>
                  <FormLabel className="text-core_heading">Videos</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
                      multiple={true}
                      disabled={form.formState.isSubmitting}
                      {...field}
                      onChange={(event) => {
                        const dataTransfer = new DataTransfer();

                        if (videos) {
                          Array.from(videos).forEach((video) =>
                            dataTransfer.items.add(video)
                          );
                        }

                        Array.from(event.target.files!).forEach((video) =>
                          dataTransfer.items.add(video)
                        );
                        Array.from(event.target.files!).forEach((videoFile) => {
                          const videoElement = document.createElement('video');
                          videoElement.src = URL.createObjectURL(videoFile);
                          
                          // Listen for the metadata loaded event
                          videoElement.onloadedmetadata = () => {
                            const durationInSeconds = videoElement.duration;
                            console.log("Duration in seconds:", durationInSeconds);
                            const totalPrice = videoPriceCalculator(durationInSeconds);
                            setCalculatedPrice(totalPrice);
                          };
                    
                    
                        });
                        const newFiles = dataTransfer.files;
                        onChange(newFiles);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-left text-core_heading font-semibold">Total Price: ${calculatedPrice.toFixed(2)}</p>
              <Button
                variant="default"
                className="flex w-full flex-row items-center gap-2"
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting} 
                >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                
                Submit & Pay
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
