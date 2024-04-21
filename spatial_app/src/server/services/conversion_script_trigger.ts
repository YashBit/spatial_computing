import sqlite3 from 'sqlite3';
import axios from "axios";
import { downloadVideo } from './s3Download';
// Open Database

const db = new sqlite3.Database('databases/job_order.db');

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

function deleteJobOrder(id: number) {
  return new Promise((resolve, reject) => {
      db.run('DELETE FROM MyTable WHERE id = ?', id, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });
}

async function triggerConversionProcess() {
  try {
      const jobOrder = await getOldestJobOrder();
      if (!jobOrder) {
          console.log('No pending job orders.');
          return;
      }
      console.log(jobOrder)
    //   downloadVideo(jobOrder.bucketName, jobOrder.objectKey, "/temp_video_storage")
      // Download the file information in local directory

      // Trigger the conversion process using the FastAPI endpoint
      // const response = await axios.post('http://localhost:8000/convert-video/', jobOrder);
      // console.log(response.data);

      // Delete the processed job order from the database
      // await deleteJobOrder(jobOrder.id);
  } catch (error) {
      console.error('Error processing job order:', error);
  }
}

// setInterval(triggerConversionProcess, 5000); // Check for new job orders every 5 seconds
