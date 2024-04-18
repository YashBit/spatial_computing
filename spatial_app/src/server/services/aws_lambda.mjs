import * as https from 'node:https';

export const handler = (event, context, callback) => {
    // Replace 'your-ngrok-url' with your actual ngrok URL
    const ngrokUrl = 'https://7a5b-182-69-181-80.ngrok-free.app';
    const path = '/api/lambda-trigger.ts'; // Specify the path of your API endpoint
    
    const postData = JSON.stringify({}); // Add any data you want to send in the POST request
    
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
