// "use client";

// // Import necessary modules and components
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useRouter } from "next/router";
// import { uploadFileToS3 } from "../server/services/s3Service"; // Import the S3 upload service
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./ui/form"
// import { Button } from "./ui/button"
// import { Input } from "./ui/input"

// Define form schema
// Define form schema
// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email(),
//   file: z
//     .custom<File>((file) => {
//       if (!(file instanceof File)) {
//         throw new Error('File is required.');
//       }
//       return file;
//     })
//     .refine((file) => file.size > 0, 'File is required.'), // You can add additional file validation rules here
// });

// // ProfileForm component
// export function ProfileForm() {
//   // Define form hook
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   // Get Next.js router instance
//   const router = useRouter();
//   const fileRef = form.register("file");

//   // Form submission handler
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//     // try {
//     //   // Check if the selected file is a video
//     //   const file = values.file[0];
//     //   if (!file.type.startsWith("video/")) {
//     //     console.error("Selected file is not a video");
//     //     return;
//     //   }

//     //   // Upload file to S3 bucket
//     //   const bucketName = "spatialapp"; // Replace with your bucket name
//     //   const folderName = "user_data/"; // Replace with the desired folder name
//     //   const fileUrl = await uploadFileToS3(file, bucketName, folderName);

//     //   // Handle form submission data here (e.g., send data to backend API)
//     //   console.log("Uploaded file URL:", fileUrl);

//     //   // Redirect to success page or another route
//     //   router.push("/success");
//     // } catch (error) {
//     //   console.error("Error submitting form:", error);
//     // }
//   }

//   // Render form fields and submit button
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         {/* Name field */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Your name" {...field} />
//               </FormControl>
//               <FormDescription>This is your public display name.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* Email field */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Address</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Your email" {...field} />
//               </FormControl>
//               <FormDescription>Please make sure it is correct.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* File upload field for video */}
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Upload Video</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="file" 
//                   {...field}
//                   onChange={(event)=>{
//                     field.onChange(event.target?.files?.[0] ?? undefined);
//                   }}
                  
//                   />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* Submit button */}
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
// const formSchema = z.object({
//   file: z.instanceof(File).optional(),
// });

// export function ProfileForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   const fileRef = form.register("file");

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     console.log(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => {
//             return (
//               <FormItem>
//                 <FormLabel>File</FormLabel>
//                 <FormControl>
//                 <Input
//                     type="file"
//                     placeholder="shadcn"
//                     {...field}
//                     onChange={(event) => {
//                       field.onChange(event.target?.files?.[0] ?? undefined);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             );
//           }}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }


"use client";

import Link from "next/link";
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
} from "../components/ui/form";

export function ProfileForm() {
  // Images
  const MAX_IMAGE_SIZE = 5242880; // 5 MB
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  // Form Schema Validation
  const formSchema = z.object({
    images: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Required`)
      .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
        `Each file size should be less than 5 MB.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ALLOWED_IMAGE_TYPES.includes(file.type)
          ),
        "Only these types are allowed .jpg, .jpeg, .png and .webp"
      ),
  });

  // Form Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Form Submit Handler (After validated with zod)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Log values
    console.log(values);
  };

  return (
    <section className="flex flex-col gap-5 xl:gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 xl:gap-5"
        >
          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange }, ...field }) => {
              // Get current images value (always watched updated)
              const images = form.watch("images");

              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  {/* File Upload */}
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple={true}
                      disabled={form.formState.isSubmitting}
                      {...field}
                      onChange={(event) => {
                        // Triggered when user uploaded a new file
                        // FileList is immutable, so we need to create a new one
                        const dataTransfer = new DataTransfer();

                        // Add old images
                        if (images) {
                          Array.from(images).forEach((image) =>
                            dataTransfer.items.add(image)
                          );
                        }

                        // Add newly uploaded images
                        Array.from(event.target.files!).forEach((image) =>
                          dataTransfer.items.add(image)
                        );

                        // Validate and update uploaded file
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
            {/* Cancel Button */}
            <Link
              href="/dashboard/my-events"
              className={`w-full ${
                form.formState.isSubmitting
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
            >
              <Button
                variant="secondary"
                type="button"
                className="flex w-full flex-row items-center gap-2"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Cancel
              </Button>
            </Link>

            {/* Submit Button */}
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
              Create Event
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

