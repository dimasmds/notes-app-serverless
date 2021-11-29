import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import DomainToHttpErrorTranslator from '../../../Commons/execptions/DomainToHTTPErrorTranslator';
import ClientError from '../../../Commons/execptions/ClientError';
import container from '../../../Infrastructures/container';
import UpdateNoteUseCase from '../../../Applications/use_cases/UpdateNoteUseCase';
import { getTokenFromAuthHeader } from '../../../Commons/utils';

const useCase = container.getInstance(UpdateNoteUseCase.name) as UpdateNoteUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    try {
      const { id } = event.pathParameters;
      const token = getTokenFromAuthHeader(event.headers.Authorization);
      const payload = JSON.parse(event.body);

      await useCase.execute({
        ...payload,
        id,
        token,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Note updated',
        }),
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
