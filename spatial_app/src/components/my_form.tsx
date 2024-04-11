
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  video: z.string(), // This might need to be adjusted based on the type of video data you're expecting
});

export default function ProfileForm(){
  const form = useForm({
    resolver: async (data) => {
      try {
        const validatedData = await schema.validateAsync(data);
        return { values: validatedData, errors: {} };
      } catch (error) {
        return { values: {}, errors: error.errors };
      }
    }
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission data here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Video</FormLabel>
              <FormControl>
                {/* Depending on your requirements, you may need to adjust the input type */}
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
