####Note
#################################################
1. Trong code ko có thông tin key và access key vì đã được config trong aws cli
2. Cần phải cài đặt serverless offline để chạy debug
```

### Step 1: Authentication by cognito (user pool and identify pool)
1. Create poll on Cognito
2. Import poll into auth.js
- yarn add serverless-offline ==> tự động insert vào serverless.yml
- config trong package.json 
```
"scripts": {
  "debug": "export SLS_DEBUG=* && node --debug ./node_modules/.bin/serverless offline -s dev",
}
```
```yml
# NOTE: update this with your service name
service: ipsa-api-backend

# Use the serverless-webpack plugin to transpile ES6
plugins:
  - serverless-webpack
  - serverless-offline

# serverless-webpack configuration
# Enable auto-packing of external modules
custom:
  serverless-offline:
    protocol: inspector
    smartStep: true
  # Our stage is based on what is passed in when running serverless
  # commands. Or fallsback to what we have set in the provider section.
  stage: ${opt:stage, self:provider.stage}
    # Set our DynamoDB throughput for prod and all other non-prod stages.
  tableThroughputs:
      prod: 5
      default: 1
  tableThroughput: ${self:custom.tableThroughputs.${self:custom.stage}, self:custom.tableThroughputs.default}
  # Load our webpack config
  webpack:
    webpackConfig: ./webpack.config.js
    includeModules: true

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-2

  # To load environment variables externally
  # rename env.example to env.yml and uncomment
  # the following line. Also, make sure to not
  # commit your env.yml.
  #
  #environment: ${file(env.yml):${self:provider.stage}}

  # 'iamRoleStatements' defines the permission policy for the Lambda function.
  # In this case Lambda functions are granted with permissions to access DynamoDB.

iamRoleStatements:
  - Effect: Allow
    Action:
      - dynamodb:DescribeTable
      - dynamodb:Query
      - dynamodb:Scan
      - dynamodb:GetItem
      - dynamodb:PutItem
      - dynamodb:UpdateItem
      - dynamodb:DeleteItem
    Resource: "arn:aws:dynamodb:us-east-2:*:*"

# Create our resources with separate CloudFormation templates
resources:
  # User pool manage
  Resources:
    CognitoUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        # Generate a name based on the stage
        UserPoolName: ${self:custom.stage}-user-pool
        # Set email as an alias
        UsernameAttributes:
          - email
        AutoVerifiedAttributes:
          - email

    CognitoUserPoolClient:
      Type: AWS::Cognito::UserPoolClient
      Properties:
        # Generate an app client name based on the stage
        ClientName: ${self:custom.stage}-user-pool-client
        UserPoolId:
          Ref: CognitoUserPool
        ExplicitAuthFlows:
          - ADMIN_NO_SRP_AUTH
        GenerateSecret: false

  # Print out the Id of the User Pool that is created
  Outputs:
    UserPoolId:
      Value:
        Ref: CognitoUserPool

    UserPoolClientId:
      Value:
        Ref: CognitoUserPoolClient

functions:
  # Defines an HTTP API endpoint that calls the main function in create.js
  # - path: url path is /notes
  # - method: POST request
  # - cors: enabled CORS (Cross-Origin Resource Sharing) for browser cross
  #     domain api call
  # - authorizer: authenticate using the AWS IAM role
  signup:
      handler: signup.ipsaSignup
      environment:
        SLS_DEBUG: true
      events:
        - http:
            path: signup
            method: post
            cors: true
        - schedule:
            rate: rate(3 minutes)
            enabled: true
  signin:
      handler: signup.ipsaSignin
      environment:
        SLS_DEBUG: true
      events:
        - http:
            path: signin
            method: post
            cors: true
        - schedule:
            rate: rate(3 minutes)
            enabled: true

```
