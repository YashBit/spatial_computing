import React from 'react';

interface EmailTemplateProps{
    bucketName:string, 
    objectKey:string, 
    eventType:string 
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    bucketName, 
    objectKey, 
    eventType,
  }) => (
    <div>
      <h1>Hi Yash there is another Client !</h1>
      <h2>Details are: </h2>
      <ol>
        <li> 1. BucketName: {bucketName} </li>
        <li> 2. ObjectKey: {objectKey} </li>
        <li> 3. eventType: {eventType} </li>
      </ol>
    </div>
  );


  export default EmailTemplate;