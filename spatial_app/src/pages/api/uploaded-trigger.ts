import { NextApiRequest, NextApiResponse } from 'next';
import { insertData } from './createTable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { bucketName, objectKey, eventType } = req.body;

            // Insert the received data into the database
            insertData(bucketName, objectKey, eventType);
            console.log("Inserted Data")
            // Send response
            res.status(200).json({ message: 'Data inserted successfully in the correct table' });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
