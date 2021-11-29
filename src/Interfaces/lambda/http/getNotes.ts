import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import { getTokenFromAuthHeader } from '../../../Commons/utils';
import container from '../../../Infrastructures/container';
import GetNotesUseCase from '../../../Applications/use_cases/GetNotesUseCase';

const useCase = container.getInstance(GetNotesUseCase.name) as GetNotesUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const token = getTokenFromAuthHeader(event.headers.Authorization);

    const notes = await useCase.execute({ token });

    return {
      statusCode: 200,
      body: JSON.stringify({ notes }),
    };
  },
);

handler.use(
  cors({
    credentials: true,
  }),
);
