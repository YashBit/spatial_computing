// pages/api/convert-video.ts


/*
    1. Separation of concerns
    2. Download the video from here
    3. Call API from Scripts
    4. 
*/



// DOWNLOAD:

import * as AWS from 'aws-sdk';
import * as fs from 'fs';

const s3 = new AWS.S3();

async function downloadFileFromS3(bucketName: string, objectKey: string, localFilePath: string) {
    const params = {
        Bucket: bucketName,
        Key: objectKey
    };

    try {
        const data = await s3.getObject(params).promise();
        fs.writeFileSync(localFilePath, data.Body as Buffer);
        console.log(`File downloaded successfully to ${localFilePath}`);
    } catch (error) {
        console.error(`Error downloading file: ${error}`);
    }
}

// Example usage
const bucketName = 'your-bucket-name';
const objectKey = 'path/to/your/file.txt';
const localFilePath = '/path/to/save/downloaded/file.txt';

downloadFileFromS3(bucketName, objectKey, localFilePath);
