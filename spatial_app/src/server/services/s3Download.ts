// pages/api/convert-video.ts


/*
    1. Separation of concerns
    2. Download the video from here
    3. Call API from Scripts
    4. 
*/

import * as fs from 'fs';
import AWS from 'aws-sdk';

// Configure AWS credentials

AWS.config.update({
    accessKeyId: "AKIAW3MEFEOIKVOHY4AK",
    secretAccessKey:"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",
    region: "ap-northeast-2"
  })

// Create an instance of the S3 service
const s3 = new AWS.S3();

// Function to download a video file from S3
export const  downloadVideo = async (bucketName: string, objectKey: string, localFilePath: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const fileStream = fs.createWriteStream(localFilePath);
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: objectKey
    };
    console.log("Here");
    // Perform the getObject operation
    s3.getObject(params)
      .on('httpData', function(chunk: any) {
        fileStream.write(chunk); // Write each chunk of data to the local file
      })
      .on('httpDone', function() {
        fileStream.end(); // Close the file stream when download is complete
        console.log('Video downloaded successfully to:', localFilePath);
        resolve();
      })
      .send();
  });
}
