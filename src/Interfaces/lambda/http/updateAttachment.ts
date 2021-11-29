import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import container from '../../../Infrastructures/container';
import UpdateAttachmentUseCase from '../../../Applications/use_cases/UpdateAttachmentUseCase';
import DomainToHttpErrorTranslator from '../../../Commons/execptions/DomainToHTTPErrorTranslator';
import ClientError from '../../../Commons/execptions/ClientError';
import { getTokenFromAuthHeader } from '../../../Commons/utils';

const useCase = container.getInstance(UpdateAttachmentUseCase.name) as UpdateAttachmentUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    try {
      const { id } = event.pathParameters;
      const token = getTokenFromAuthHeader(event.headers.Authorization);
      const url = await useCase.execute({ token, noteId: id });

      return {
        statusCode: 200,
        body: JSON.stringify({ url }),
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
