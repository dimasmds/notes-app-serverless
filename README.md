# Serverless Notes App

A simple notes apps application using AWS Lambda and Serverless framework.

## Functionality of the application

This application will allow creating/removing/updating/fetching Notes items. Each Notes item can optionally have more than one attachment image. Each user only has access to Notes items that he/she has created.

## Prerequisites

### Node.js and NPM

Before getting started, make sure Node.js is downloaded and installed. The latest version of Node.js can be downloaded from [nodejs.org](https://nodejs.com/en/download), and it's recommended to use the LTS version.

### Serverless Framework

Serverless Framework is used to build and deploy the application. Instructions for installing Serverless Framework can be found [here](https://serverless.com/framework/docs/getting-started/).

### Amazon Web Services (AWS)

An AWS account is required to deploy the application.

## Getting started

### Backend

To build and deploy the application, first edit the `serverless.yml` file to set the appropriate AWS parameters, then run the following commands:

1. Install dependencies: `npm install`
2. Build and deploy to AWS: `sls deploy -v`

It's also support for local development. To do so, run the following commands:
1. Install dependencies: `npm install`
2. Download & run dynamodb:
    1. `npm run dynamodb:install`
    2. `npm run dynamodb:start`
3. Start offline development: `npm run start:offline`


### Postman collection

A Postman collection is available in the root folder of the project. The filename is `notes-app-serverless.postman_collection.json`, as a way to test the API.
To test the application, **please run request collection sequentially**.
