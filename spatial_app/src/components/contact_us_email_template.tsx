import React from 'react';

interface EmailTemplateProps{
    name:string, 
    email:string, 
    subject:string,
    message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name, email, subject, message
  }) => (
    <div>
      <h1>Hi Yash Inquiry Sent by Client</h1>
      <h2>Details are: </h2>
      <ol>
        <li> 1. name: {name} </li>
        <li> 2. email: {email} </li>
        <li> 3. subject: {subject} </li>
        <li> 4. message: {message} </li>
      </ol>
    </div>
  );


  export default EmailTemplate;