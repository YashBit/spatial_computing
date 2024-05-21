import sqlite3 from 'sqlite3';
import axios, { AxiosResponse } from 'axios';
import { downloadVideo } from './src/server/services/s3Download';
import { uploadFileToS3 } from './src/server/services/s3Upload';
// Open Database
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
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
    4a. Delete Job ID, LOCAL VIDEO
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
        const scriptPath = new URL(import.meta.url).pathname;  
        const videoPath = path.join(path.dirname(scriptPath), 'tmp', 'video.mp4');
        const fileObject = fs.createReadStream(videoPath);
        const formData = new FormData();
        formData.append('file', fileObject, 'video.mp4');  
        const response = await axios.post('http://127.0.0.1:8000/convert-video/', formData, {
          headers: formData.getHeaders(), // Include headers required for file upload
        });
        console.log('Conversion process triggered:', response.data.message);
        
      }
  } catch (error) {
      console.error('Error processing job order:', error);
  }
}
triggerConversionProcess();
// setInterval(triggerConversionProcess, 5000); // Check for new job orders every 5 seconds
