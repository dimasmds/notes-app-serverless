/* istanbul ignore file */
import * as AWS from 'aws-sdk';
import * as AWSXray from 'aws-xray-sdk';

const createS3Client = () => {
  const client = new AWS.S3({
    signatureVersion: 'v4',
  });

  if (process.env.IS_OFFLINE || process.env.NODE_ENV === 'test') return client;
  return AWSXray.captureAWSClient(client);
};

export default createS3Client;
