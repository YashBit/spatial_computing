// pages/api/convert-video.ts


/*
    1. Separation of concerns
    2. Download the video from here
    3. Call API from Scripts
    4. 
*/

import * as fs from 'fs';
import AWS from 'aws-sdk';
import * as path from 'path';
// Configure AWS credentials

AWS.config.update({
    accessKeyId: "AKIAW3MEFEOIKVOHY4AK",
    secretAccessKey:"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",
    region: "ap-northeast-2"
  })

// Create an instance of the S3 service
const s3 = new AWS.S3();
export const downloadVideo = async (bucketName: string, objectKey: string, localFilePath: string): Promise<Buffer | undefined> => {
  const filename = 'video.mp4'; // You can replace this with a dynamic filename if needed
  const uniqueFilePath = path.join(localFilePath, filename);
  const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: objectKey
  };

  try {
      const data = await s3.getObject(params).promise();

      if (data.Body) {
          const bodyBuffer: Buffer = data.Body as Buffer;
          await fs.promises.writeFile(uniqueFilePath, bodyBuffer);
          console.log(`File downloaded successfully to: ${uniqueFilePath}`);
          return bodyBuffer;
      }
  } catch (error) {
      console.error(`Error downloading file: ${error}`);
  }
};

