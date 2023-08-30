const axios = require('axios');
const AWS = require('aws-sdk');

const sns = new AWS.SNS();

exports.handler = async (event, context) => {
  console.log('Lambda function execution started.');

  const accessToken = process.env.ACCESS_TOKEN;
  const apiUrl = 'https://api.github.com/repos/matiwan3/autogit-streak/contents/dailyautocommit.txt';

  try {
    // Make API GET request
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Extract content from the API response
    const content = response.data.content;
    
    // Decode the Base64 content
    const decodedContent = Buffer.from(content, 'base64').toString('utf-8');
    
    // Modify the content as needed
    const modifiedContent = decodedContent + '\nContent modified by automated AWS lambda script ©';
    
    // Encode the modified content to Base64
    const encodedModifiedContent = Buffer.from(modifiedContent, 'utf-8').toString('base64');

    // Update the file using GitHub API
    const updateResponse = await axios.put(apiUrl, {
      message: 'Auto-commit by AWS lambda',
      content: encodedModifiedContent,
      sha: response.data.sha,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // console.log('Update Response:', updateResponse.data);

    console.log('Lambda function execution completed.');
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify('Lambda function executed successfully'),
    // };
  } catch (error) {
    console.error('Error:', error);
    console.log('Lambda function execution completed with an error.');
    return {
      statusCode: 500,
      body: JSON.stringify('An error occurred during Lambda execution'),
    };
  }
  const params = {
    Message: 'AWS Lambda action', // Replace with your actual message
    Subject: 'Aws lambda function has been triggered', // Replace with your actual subject
    TopicArn: 'arn:aws:sns:eu-north-1:273554840605:sendNotifaction'
  };

  try {
    const publishResponse = await sns.publish(params).promise();
    console.log('SNS message published:', publishResponse.MessageId);
    // Rest of your code
  } catch (error) {
    console.error('Error publishing SNS message:', error);
  }
};

  
