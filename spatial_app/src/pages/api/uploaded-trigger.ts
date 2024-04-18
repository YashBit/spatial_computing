import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

// Open a database connection
const db = new sqlite3.Database('yourdatabase.db');

// Define a function to create your table if it doesn't exist
function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS MyTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bucketName TEXT,
        objectKey TEXT,
        eventType TEXT
    )`);
}

// Function to insert data into the database
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

// Call the function to create the table
createTable();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { bucketName, objectKey, eventType } = req.body;

            // Insert the received data into the database
            insertData(bucketName, objectKey, eventType);

            // Send response
            res.status(200).json({ message: 'Data inserted successfully' });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
