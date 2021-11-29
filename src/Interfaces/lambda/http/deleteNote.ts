import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import container from '../../../Infrastructures/container';
import DeleteNoteUseCase from '../../../Applications/use_cases/DeleteNoteUseCase';
import { getTokenFromAuthHeader } from '../../../Commons/utils';
import DomainToHttpErrorTranslator from '../../../Commons/execptions/DomainToHTTPErrorTranslator';
import ClientError from '../../../Commons/execptions/ClientError';

const useCase = container.getInstance(DeleteNoteUseCase.name) as DeleteNoteUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    try {
      const { id } = event.pathParameters;
      const token = getTokenFromAuthHeader(event.headers.Authorization);
      await useCase.execute({ id, token });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Note deleted',
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
