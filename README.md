# AutoGit Streak AWS Lambda Script

Automate daily commits on GitHub and receive email notifications using AWS Lambda and Amazon SNS.

## Prerequisites

- **AWS Account:** If you don't have one, sign up for an [AWS Account](https://aws.amazon.com/).
- **GitHub Account:** Create a [GitHub Account](https://github.com/).
- **GitHub Repository:** Create a repository where you want to maintain your commit streak.
- **Node.js:** Make sure you have Node.js installed on your machine.

## Set Up AWS Lambda Function

### 1. Create Lambda Function

- Log in to your AWS Management Console.
- Navigate to the AWS Lambda service.
- Click on "Create function."
- Choose "Author from scratch."
- Fill in the details:
  - **Function name:** AutoGitStreak
  - **Runtime:** Node.js 14.x (or your preferred version)
  - **Role:** Create a new role with basic Lambda permissions.

### 2. Configure Environment Variables

- In the Lambda function settings, navigate to the "Environment variables" section.
- Add a variable:
  - **Key:** ACCESS_TOKEN
  - **Value:** Your GitHub Personal Access Token

### 3. Upload Code

- Copy and paste the provided code from `autocommitServer.js` into the Lambda function editor.
- Change the repository details (owner, repo, etc.) to match your repository.

### 4. Configure Triggers

- Scroll down to the "Add triggers" section.
- Click on "Add trigger."
- Select "CloudWatch Events / EventBridge" as the trigger.
- Set up a rule to run your Lambda function daily at the desired time (e.g., 4:00 PM).

## GitHub Repository Setup

### 1. Personal Access Token

- Create a [GitHub Personal Access Token](https://github.com/settings/tokens).
- Grant `repo` and `write:public_key` scopes.
- Copy the token and use it as the `ACCESS_TOKEN` environment variable in your Lambda function.

### 2. Repository File

- Create a file named `dailyautocommit.txt` in your repository.
- This file will be updated with a new line every time the Lambda function runs.

## Sending Email Notifications with Amazon SNS

### 1. Create an SNS Topic

- Navigate to the AWS SNS service.
- Click on "Create topic."
- Enter a name for your topic.
- Once created, copy the ARN of the topic.

### 2. Modify Lambda Code

- In the Lambda code, locate the `TopicArn` parameter and replace it with the copied ARN.

## Deploy and Run

### 1. Deploy Lambda Function

- Save and deploy your Lambda function.

### 2. Test and Monitor

- Your Lambda function will automatically run daily, updating the `dailyautocommit.txt` file.
- Monitor the Lambda function's CloudWatch logs for any errors or updates.

### 3. Receive Notifications

- You will receive an email notification to the specified email address every time the Lambda function runs.

## Conclusion

With this setup, you can maintain your GitHub commit streak by automating daily commits using AWS Lambda. The included SNS integration will notify you of each successful commit.

Feel free to customize and enhance this setup according to your preferences and requirements. If you have any issues or questions, refer to the AWS documentation or GitHub's resources. Happy coding and contributing!
