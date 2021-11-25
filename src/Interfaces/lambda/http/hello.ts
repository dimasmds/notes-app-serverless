import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => ({
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  }),
);

handler.use(
  cors({
    credentials: true,
  }),
);
