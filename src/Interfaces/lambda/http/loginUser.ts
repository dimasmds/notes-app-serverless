import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import container from '../../../Infrastructures/container';
import LoginUseCase from '../../../Applications/use_cases/LoginUseCase';

const useCase = container.getInstance(LoginUseCase.name) as LoginUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const payload = JSON.parse(event.body);
    const token = await useCase.execute(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
      }),
    };
  },
);

handler.use(
  cors({
    credentials: true,
  }),
);
