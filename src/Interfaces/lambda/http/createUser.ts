import middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors } from 'middy/middlewares';
import container from '../../../Infrastructures/container';
import RegisterUserUseCase from '../../../Applications/use_cases/RegisterUserUseCase';
import DomainToHttpErrorTranslator from '../../../Commons/execptions/DomainToHTTPErrorTranslator';
import ClientError from '../../../Commons/execptions/ClientError';

const useCase = container.getInstance(RegisterUserUseCase.name) as RegisterUserUseCase;

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const payload = JSON.parse(event.body);

      const user = await useCase.execute(payload);

      return {
        statusCode: 201,
        body: JSON.stringify({
          user,
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
