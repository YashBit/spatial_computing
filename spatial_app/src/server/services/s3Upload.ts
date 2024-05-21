import AWS from 'aws-sdk';
import {Readable} from 'stream';
import multer, { FileFilterCallback } from "multer";

AWS.config.update({
  accessKeyId: "AKIAW3MEFEOIKVOHY4AK",
  secretAccessKey:"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",
  region: "ap-northeast-2"
})

const s3 = new AWS.S3();
interface FileMetadata{
  email:string;
  name:string;
}
export const uploadFileToS3 = async (file: Express.Multer.File, email: string, name: string, bucketName: string, folderName: string): Promise<string> => {
  // const fileStream = Readable.from(file.buffer);
  console.log("In S3")

  const metadata: { [key: string]: string } = { // Define metadata with a string index signature
    email,
    name
  };
  const file2 = file[0];

  const fileReader = new FileReader();
  const readFilePromise = new Promise((resolve, reject) => {
  fileReader.onload = () => {
      // Resolve with the file content when reading is complete
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
  });
  fileReader.readAsArrayBuffer(file2);
  // console.log("File MIMETYPE")
  // console.log(file2.type)
  
  try {
    await readFilePromise;
    const fileContent = fileReader.result as ArrayBuffer;
    console.log("FILE CONTENT")
    console.log(fileContent)
    const timestamp = Date.now();
    const filename = file2.name;
    const file_name = `${timestamp}-${filename}`
    const uploadParams = {
      Bucket: bucketName,
      Key: `${folderName}${file_name}`,
      Body: fileContent, 
      ContentType: file2.type, 
      Metadata: { email, name }, 
    };

    const data = await s3.upload(uploadParams).promise();
    return data.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
};