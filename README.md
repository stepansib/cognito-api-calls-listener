# AWS Cognito App Client Updates Tracking PoC

## Description

Work in progress...

## Deployment manual

### Prerequisites

- Install [Node Version Manager](https://github.com/nvm-sh/nvm) globally
- Clone the repository and navigate to the root folder
- Run `nvm use` command to switch (and optionally download) to required Node.js version
- Run `npm install` command to install all the project dependencies
- Copy `.env.dist` file to `.env` and populate AWS account credentials

### Deployment

- Run `npm run deploy` command to deploy CF stack to configured AWS account

### Cleanup

- Run `npm run remove` command to remove CF stack from configured AWS account

### Contribution

To follow ESLint and Prettier rules please setup husky pre-commit hook:
 - `npx husky init && echo "lint-staged && npm run build" > .husky/pre-commit`
