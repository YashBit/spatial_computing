import AWS from 'aws-sdk';
import {Readable} from 'stream';

AWS.config.update({
  accessKeyId: "AKIAW3MEFEOIKVOHY4AK",
  secretAccessKey:"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",
  region: "Asia Pacific (Seoul) ap-northeast-2"
})

const s3 = new AWS.S3();

export const uploadFileToS3 = async (file: Express.Multer.File, bucketName: string, folderName: string): Promise<string> => {
    const fileStream = Readable.from(file.buffer);
  
    const uploadParams = {
      Bucket: bucketName,
      Key: `${folderName}/${file.originalname}`,
      Body: fileStream,
      ContentType: file.mimetype
    };
  
    try {
      const data = await s3.upload(uploadParams).promise();
      return data.Location; // Return the URL of the uploaded file
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  };