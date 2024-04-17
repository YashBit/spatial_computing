import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log('Received request:', req.body);
        // Handle the incoming request here
        res.status(200).json({ message: 'Request received' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
