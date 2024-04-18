import * as https from 'node:https';

export const handler = (event, context, callback) => {
    // Replace 'your-ngrok-url' with your actual ngrok URL
    const ngrokUrl = '7a5b-182-69-181-80.ngrok-free.app';
    const path = '/api/uploaded-trigger'; // Specify the path of your API endpoint
    
    const s3EventData = event.Records[0].s3;

    // Extract relevant information from the S3 event data
    const bucketName = s3EventData.bucket.name;
    const objectKey = s3EventData.object.key;
    const eventType = event.Records[0].eventName; // Event type (e.g., 'ObjectCreated:Put')
    // const username = s3EventData.Metadata['x-amz-meta-name'];
    // const userEmail = s3EventData.Metadata['x-amz-meta-email'];
    
    // Construct the data to be sent to your API
    const data = {
        bucketName: bucketName,
        objectKey: objectKey,
        eventType: eventType,
        // userEmail: userEmail,
        // userName: username,
        // Add any other relevant data here
    };

    // Add any data you want to send in the POST request
    const postData = JSON.stringify(data);
    
    const options = {
        method: 'POST',
        hostname: ngrokUrl,
        path: path,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
        },
    };

    const req = https.request(options, (res) => {
        let body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Successfully processed HTTPS response');
            // If we know it's JSON, parse it
            if (res.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            callback(null, body);
        });
    });
    
    req.on('error', callback);
    req.write(postData);
    req.end();
};
