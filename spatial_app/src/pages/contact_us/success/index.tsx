import React from 'react';

const EmailSent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-black opacity-80 rounded-lg"></div>
        <div className="relative z-10 p-8 bg-opacity-75 rounded-lg">
          <h1 className="text-3xl font-bold text-core_heading">Email Sent!</h1>
          <p className="off-white-text">
            Thank you for getting in touch. Your message has been successfully sent.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailSent;
