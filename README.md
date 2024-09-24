# AWS Cognito API Calls Listener PoC

## Table of contents

- [Description](#description)
- [Architecture design](#architecture-design)
- [How to use](#how-to-use)
  - [Prepare](#prepare)
  - [Deploy](#deploy)
  - [Evaluate](#evaluate)
  - [Customize](#customize)
  - [Cleanup](#cleanup)
  - [Contribute](#contribute)

## Description

The solution demonstrates how to get notified about AWS Cognito API calls asynchronously.
Sometimes it is necessary to react to any change in the Cognito environment immediately. But Cognito quotas are pretty
restrictive in terms of calling its API so it can't be done pretty often

This solution can be adjusted to intercept any change in the Cognito environment that was done via an AWS Cognito API call (no
matter whether it was done programmatically or through the AWS Cognito Console).

Flow:

- Cognito API invoked (programmatically or through the AWS Cognito Console)
- Corresponding event tracked by custom trail in AWS Cloudtrail
- Event sent to the "default" EventBridge bus (as well as other events originated by different AWS
  services)
- Corresponding AWS EventBridge rule (pre-configured to match AWS CloudTrail events originated by specific AWS Cognito
  API calls) filtered matching event
- Rule invoked its target (Lambda function) with the payload of event

## Architecture design

Work in progress...

## How to use

### Prepare

- Install [Node Version Manager](https://github.com/nvm-sh/nvm) globally
- Clone the repository and navigate to the root folder
- Run `nvm use` command to switch (and optionally download) to required Node.js version
- Run `npm install` command to install all the project dependencies
- Copy `.env.dist` file to `.env` and populate AWS account credentials
- (optional) [Setup pre-commit hook](#contribute)

### Deploy

- Run `npm run deploy` command to deploy CF stack to configured AWS account

### Evaluate

- Change the allowed custom scopes configuration of the `cacl-app-client` application client. For example - remove the
  `cacl-api/something.write` scope
- Wait for several seconds and check the CloudWatch log group of the `cacl-app-client-api-call-subscriber` Lambda
- Note the corresponding log that represents `UpdateUserPoolClient` AWS Cognito API call (with its request parameters,
  response, and other useful metadata)
- Implement any custom logic that needs to be executed based on this API call

### Customize

This PoC demonstrates how to intercept following AWS Cognito User Pool Application Client API calls

- DeleteUserPoolClient
- UpdateUserPoolClient

You can change this behavior by adjusting AWS EventBridge rule pattern:

- Choose another API method(s)
- Filter only events that relate to specific User Pool, App Client, Resource Server or any other part(s) of Cognito
  environment
- Filter the only API calls which body/payload match with any custom pattern
- And so on...

### Cleanup

- Run `npm run remove` command to remove CF stack from configured AWS account

### Contribute

To follow ESLint and Prettier rules please setup husky pre-commit hook by running the following command:

- `npx husky init && echo "lint-staged && npm run build" > .husky/pre-commit`
