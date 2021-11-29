import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import DomainToHttpErrorTranslator from '../../../Commons/execptions/DomainToHTTPErrorTranslator';
import ClientError from '../../../Commons/execptions/ClientError';
import { getTokenFromAuthHeader } from '../../../Commons/utils';
import container from '../../../Infrastructures/container';
import CreateNoteUseCase from '../../../Applications/use_cases/CreateNoteUseCase';

const useCase = container.getInstance(CreateNoteUseCase.name) as CreateNoteUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    try {
      const token = getTokenFromAuthHeader(event.headers.Authorization);
      const payload = JSON.parse(event.body);

      const newNote = await useCase.execute({
        ...payload,
        token,
      });

      return {
        statusCode: 201,
        body: JSON.stringify({ newNote }),
      };
    } catch (error: any) {
      const translatedError = DomainToHttpErrorTranslator.translate(error);

      if (translatedError instanceof ClientError) {
        return {
          statusCode: translatedError.statusCode,
          body: JSON.stringify({
            message: translatedError.message,
          }),
        };
      }

      console.error(translatedError);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'something wrong with our service',
        }),
      };
    }
  },
);

handler.use(
  cors({
    credentials: true,
  }),
);
