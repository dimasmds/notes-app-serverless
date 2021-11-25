/* istanbul ignore file */
import * as AWS from 'aws-sdk';
import * as AWSXray from 'aws-xray-sdk';

const createDynamoDbClient = () => {
  if (process.env.NODE_ENV === 'test' || process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  }

  const XAWS = AWSXray.captureAWS(AWS);
  return new XAWS.DynamoDB.DocumentClient();
};

const client = createDynamoDbClient();
export default client;
