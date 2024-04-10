// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "../components/ui/button";
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
// import { Input } from "../components/ui/input";

// const formSchema = z.object({
//   Name: z.string().min(1).max(255),
//   Email_Address: z.string().email(),
//   Video: z.string(), // Assuming Video is a file name or type
//   Price: z.number().positive()
// });

// export function MyForm() {
//   const { handleSubmit, control, formState: { errors } } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       Name: "",
//       Email_Address: "",
//       Video: "",
//       Price: ""
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     console.log(values); // Do something with the form data
//   };

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       <FormItem>
//         <FormLabel>Name</FormLabel>
//         <FormField
//           control={control}
//           name="Name"
//           render={({ field }) => (
//             <Input placeholder="Enter your name" {...field} />
//           )}
//         />
//         {errors.Name && <FormMessage>{errors.Name.message}</FormMessage>}
//       </FormItem>
//       <FormItem>
//         <FormLabel>Email Address</FormLabel>
//         <FormField
//           control={control}
//           name="Email_Address"
//           render={({ field }) => (
//             <Input placeholder="Enter your email address" {...field} />
//           )}
//         />
//         {errors.Email_Address && <FormMessage>{errors.Email_Address.message}</FormMessage>}
//       </FormItem>
//       <FormItem>
//         <FormLabel>Video</FormLabel>
//         <FormField
//           control={control}
//           name="Video"
//           render={({ field }) => (
//             <Input type="file" {...field} />
//           )}
//         />
//         {errors.Video && <FormMessage>{errors.Video.message}</FormMessage>}
//       </FormItem>
//       <FormItem>
//         <FormLabel>Price</FormLabel>
//         <FormField
//           control={control}
//           name="Price"
//           render={({ field }) => (
//             <Input type="number" placeholder="Enter the price" {...field} />
//           )}
//         />
//         {errors.Price && <FormMessage>{errors.Price.message}</FormMessage>}
//       </FormItem>
//       <Button type="submit">Submit</Button>
//     </Form>
//   );
// }
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

export default function ProfileForm() {
  const form = useForm();
  const onSubmit = (data) => {
    console.log(data); // Handle form submission data here
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
