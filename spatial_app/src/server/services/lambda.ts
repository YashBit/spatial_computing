


// pages/api/lambda-trigger.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      // Extract data from request body
      const data = req.body;
  
      // Process the data (e.g., log it)
      console.log('Data received from Lambda:', data);
  
      // Send response back to Lambda
      res.status(200).json({ message: 'Data received successfully.' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  