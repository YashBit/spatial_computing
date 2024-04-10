"use client"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

const formSchema = z.object({
    Name: z.string().min(1).max(255),
    Email_Address: z.string().email(),
    Video: z.string(), // Assuming Video is a file name or type
    Price: z.number().positive()
});