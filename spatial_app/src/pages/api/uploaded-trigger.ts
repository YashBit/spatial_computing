import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

// Open a database connection
const db = new sqlite3.Database('job_order.db');

// Define a flag to track whether table creation has been performed
let isTableCreated = false;

// Define a function to create your table if it doesn't exist
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
        isTableCreated = true; // Set the flag to true after table creation
    }
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
            console.log("Inserted Data")
            // Send response
            res.status(200).json({ message: 'Video Data Updated in SQL Table' });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};