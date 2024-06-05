import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Label } from '../../../src/components/ui/label';
import { Input } from '../../../src/components/ui/input';
import { Textarea } from '../../../src/components/ui/textarea';
import { Button } from '../../../src/components/ui/button';
import { useRouter } from 'next/router';

export default function Component() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      subject,
      message,
    };
    try {
      const response = await fetch('/api/contact_us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (result.success) {
        // router.push('/success');
        setSuccess(true);
      } else {
        console.error('Error sending email:', result.error);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSuccess(false);
    }
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
            <div className="space-y-2 text-core_heading bg-transparent">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    className="min-h-[100px]"
                    value={message}
                    onChange={handleInputChange(setMessage)}
                />
            </div>
            <Button type="submit" className = "bg-button_color">Send message</Button>
          </div>
          {success && <p className="text-green-500">Email sent!</p>}
        </form>
      </div>
    </div>
  );
}
