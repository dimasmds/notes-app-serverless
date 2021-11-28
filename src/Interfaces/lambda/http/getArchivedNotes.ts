import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import container from '../../../Infrastructures/container';
import GetArchivedNotesUseCase from '../../../Applications/use_cases/GetArchivedNotesUseCase';
import { getTokenFromAuthHeader } from '../../../Commons/utils';

const useCase = container.getInstance(GetArchivedNotesUseCase.name) as GetArchivedNotesUseCase;

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
