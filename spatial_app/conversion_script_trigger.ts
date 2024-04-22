import sqlite3 from 'sqlite3';
import axios, { AxiosResponse } from 'axios';
import { downloadVideo } from './src/server/services/s3Download';
import { uploadFileToS3 } from './src/server/services/s3Upload';
// Open Database
import FormData from 'form-data';
import fs from 'fs';

const db = new sqlite3.Database('job_order.db');

function getOldestJobOrder() {
  return new Promise((resolve, reject) => {
      db.get('SELECT * FROM MyTable ORDER BY id LIMIT 1', (err, row) => {
          if (err) {
              reject(err);
          } else {
              resolve(row);
          }
      });
  });
}

// function deleteJobOrder(id: number) {
//   return new Promise((resolve, reject) => {
//       db.run('DELETE FROM MyTable WHERE id = ?', id, (err) => {
//           if (err) {
//               reject(err);
//           } else {
//               resolve();
//           }
//       });
//   });
// }



/*

    1. Job Order
    2. Download Video
    3. Process Video from this
    4. After Conversion is Complete - Upload it
    5. Then move on to next job.

*/
async function triggerConversionProcess() {
  try {
      const jobOrder = await getOldestJobOrder();
      if (!jobOrder) {
          console.log('No pending job orders.');
          return;
      }
      console.log("Job Order Seen")
      console.log(jobOrder)
      const object_metaData = await downloadVideo(jobOrder.bucketName, jobOrder.objectKey, "tmp")
      if (object_metaData) {
        // Create FormData object to send file data
        const formData = new FormData();
        formData.append('file', fs.createReadStream('tmp')); // Assuming 'tmp' is the downloaded file
  
        // Hit the FastAPI endpoint with the file data as input
        const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:8000/convert-video/', formData, {
          headers: {
            ...formData.getHeaders(), // Include headers required for file upload
            'Content-Type': 'multipart/form-data', // Ensure correct content type
          },
        });
  
        console.log('Conversion process triggered:', response.data.message);
      }
      // Trigger the conversion process using the FastAPI endpoint
      // const response = await axios.post('http://localhost:8000/convert-video/', jobOrder);
      // console.log(response.data);

      // Delete the processed job order from the database
      // await deleteJobOrder(jobOrder.id);
  } catch (error) {
      console.error('Error processing job order:', error);
  }
}
triggerConversionProcess();
// setInterval(triggerConversionProcess, 5000); // Check for new job orders every 5 seconds
