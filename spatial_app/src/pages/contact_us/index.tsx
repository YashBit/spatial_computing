import React, { useState, FormEvent, ChangeEvent } from "react";
import { Label } from "../../../src/components/ui/label";
import { Input } from "../../../src/components/ui/input";
import { Textarea } from "../../../src/components/ui/textarea";
import { Button } from "../../../src/components/ui/button";

export default function Component() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      subject,
      message,
    };
    console.log("Form Data Submitted:", formData);
    // You can send formData to a server or perform any other actions here
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setter(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-black opacity-80 rounded-lg"></div>
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8 p-8 bg-opacity-75 rounded-lg">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-core_heading">Contact Us</h1>
            <p className="off-white-text">
              Want to get in touch? Fill out the form below to send me a message.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-core_heading">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={handleInputChange(setName)}
                />
              </div>
              <div className="space-y-2 text-core_heading">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                />
              </div>
            </div>
            <div className="space-y-2 text-core_heading">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={handleInputChange(setSubject)}
              />
            </div>
            <div className="space-y-2 text-core_heading">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                className="min-h-[100px]"
                value={message}
                onChange={handleInputChange(setMessage)}
              />
            </div>
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
