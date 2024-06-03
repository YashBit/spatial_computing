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
import {uploadFileToS3} from "../server/services/s3Upload"
import { useRouter } from 'next/router';

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const videos = values["videos"];
      const email = values["email"];
      const name = values["name"];
      const bucketName = "spatialapp";
      const folderName = "user_data/";
      
      const fileUrl = await uploadFileToS3(videos, email, name, bucketName, folderName);

      console.log("Uploaded file URL:", fileUrl);

      router.push("convert_now/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="flex flex-col gap-8 xl:gap-10 text-xlg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 xl:gap-5 "
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
              <FormDescription className="off-white-text">This is your public display name.</FormDescription>
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
                          Array.from(images).forEach((video) =>
                            dataTransfer.items.add(video)
                          );
                        }

                        Array.from(event.target.files!).forEach((videos) =>
                          dataTransfer.items.add(videos)
                        );

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
        </form>
      </Form>
    </section>
  );
};
