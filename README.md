# AWS Cognito API Calls Monitoring and Processing

## Table of contents

- [AWS Cognito API Calls Monitoring and Processing](#aws-cognito-api-calls-monitoring-and-processing)
  - [Description](#description)
  - [How to use](#how-to-use)
    - [Prepare](#prepare)
    - [Deploy](#deploy)
    - [Cleanup](#cleanup)
    - [Contribute](#contribute)

## Description

Solution demonstrates how to asynchronously get notified about AWS Cognito API calls.
Sometimes it is needed to react on any change of Cognito environment to react immediately. But Cognito quotas are pretty
restrictive in terms of calling its API so it can't be done pretty often

This solution can be adjusted to intercept any change of Cognito environment that was done via AWS Cognito API call (no
matter was it done programmatically or through the AWS Cognito Console).

Flow:

- Cognito API invoked (programmatically or through the AWS Cognito Console)
- Corresponding event tracked by custom trail in AWS Cloudtrail
- Event sent to the "default" EventBridge bus (as well as other events originated by different AWS
  services)
- Corresponding AWS EventBridge rule (pre-configured to match AWS CloudTrail events originated by specific AWS Cognito
  API calls) filtered matching event
- Rule invoked its target (Lambda function) with the payload of event

This PoC demonstrates how to intercept following AWS Cognito User Pool Application Client API calls

- DeleteUserPoolClient
- UpdateUserPoolClient

You can change this behavior by adjusting AWS EventBridge rule pattern:

 - Choose another API method(s)
 - Filter only events that relate to specific User Pool, App Client, Resource Server or any other part(s) of cognito environment
 - Filter the only API calls which body/payload match with any custom pattern  
 - And so on...

## How to use

### Prepare

- Install [Node Version Manager](https://github.com/nvm-sh/nvm) globally
- Clone the repository and navigate to the root folder
- Run `nvm use` command to switch (and optionally download) to required Node.js version
- Run `npm install` command to install all the project dependencies
- Copy `.env.dist` file to `.env` and populate AWS account credentials

### Deploy

- Run `npm run deploy` command to deploy CF stack to configured AWS account

### Cleanup

- Run `npm run remove` command to remove CF stack from configured AWS account

### Contribute

To follow ESLint and Prettier rules please setup husky pre-commit hook:

- `npx husky init && echo "lint-staged && npm run build" > .husky/pre-commit`
