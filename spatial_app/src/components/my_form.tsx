// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import { uploadFileToS3 } from "../server/services/s3Service"; // Import the S3 upload service
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  file: z.unknown(),
});

// ProfileForm component
export function ProfileForm() {
  // Define form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Get Next.js router instance
  const router = useRouter();

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Check if the selected file is a video
      const file = values.file[0];
      if (!file.type.startsWith("video/")) {
        console.error("Selected file is not a video");
        return;
      }

      // Upload file to S3 bucket
      const bucketName = "spatialapp"; // Replace with your bucket name
      const folderName = "user_data/"; // Replace with the desired folder name
      const fileUrl = await uploadFileToS3(file, bucketName, folderName);

      // Handle form submission data here (e.g., send data to backend API)
      console.log("Uploaded file URL:", fileUrl);

      // Redirect to success page or another route
      router.push("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  // Render form fields and submit button
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>Please make sure it is correct.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* File upload field for video */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Video</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
