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
  FormDescription
} from "../components/ui/form";

export function ProfileForm() {
  // Images
  const MAX_IMAGE_SIZE = 31457280; // 5 MB
  const ALLOWED_VIDEO_TYPES = [
    "video/mov",
    "video/mp4",
    "video/avi",
    "video/*",
  ];

  // Form Schema Validation
  const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    videos: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Required`)      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
        `Less than 30MB please.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ALLOWED_VIDEO_TYPES.includes(file.type)
          ),
        "Only these types are allowed .mov, .avi, .mp4"
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
          {/* Images */}
          <FormField
            control={form.control}
            name="videos"
            render={({ field: { onChange }, ...field }) => {
              // Get current images value (always watched updated)
              const videos = form.watch("videos");

              return (
                <FormItem>
                  <FormLabel>Videos</FormLabel>
                  {/* File Upload */}
                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
                      multiple={true}
                      disabled={form.formState.isSubmitting}
                      {...field}
                      onChange={(event) => {
                        // Triggered when user uploaded a new file
                        // FileList is immutable, so we need to create a new one
                        const dataTransfer = new DataTransfer();

                        // Add old images
                        if (videos) {
                          Array.from(images).forEach((video) =>
                            dataTransfer.items.add(video)
                          );
                        }

                        // Add newly uploaded images
                        Array.from(event.target.files!).forEach((videos) =>
                          dataTransfer.items.add(videos)
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

