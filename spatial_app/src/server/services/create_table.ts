import sqlite3 from 'sqlite3';

// Open a database connection
const db = new sqlite3.Database('databases/job_order.db');

// Define a function to create your table if it doesn't exist
export function createTable() {
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
}

// Call the function to create the table
createTable();
