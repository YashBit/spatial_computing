import { EmailTemplate } from '../../components/founder_email_template';
import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { Resend } from 'resend';
import fetch from 'node-fetch';
// Open a database connection
const db = new sqlite3.Database('job_order.db');
let isTableCreated = false;
function createTable() {
    if (!isTableCreated) {
        db.run(`CREATE TABLE IF NOT EXISTS MyTable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bucketName TEXT,
            objectKey TEXT,
            eventType TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Table created successfully');
            }
        });
        isTableCreated = true; 
    }
}
function insertData(bucketName: string, objectKey: string, eventType: string) {
    db.run(`INSERT INTO MyTable (bucketName, objectKey, eventType) VALUES (?, ?, ?)`,
        [bucketName, objectKey, eventType], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            } else {
                console.log('Data inserted successfully');
            }
        });
}

createTable();


// @@@@@ EMAIL CODE:
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendFounderEmail(req: NextApiRequest, res: NextApiResponse){
    const {bucketName, objectKey, eventType} = req.body;
    const { data: data2, error } = await resend.emails.send({
        from: 'New Client <onboarding@resend.dev>',
        to: ['yashbharti924@gmail.com'],
        subject: 'New Client',
        react: EmailTemplate({ bucketName, objectKey, eventType}),
        text: "This is the plain text of the email"
      });
    
      if (error) {
        return res.status(400).json(error);
      }
    
      res.status(200).json(data2);
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { bucketName, objectKey, eventType } = req.body;
            insertData(bucketName, objectKey, eventType);
            console.log("Inserted Data")
            // Send Email to Founder
            const email_result = await sendFounderEmail(req, res);
            console.log('sendFounderEmailResult', email_result);
            res.status(200).json({ message: 'Video Data Updated in SQL Table' });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};