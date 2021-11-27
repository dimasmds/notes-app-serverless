import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda';
import container from '../../../Infrastructures/container';
import SecretManager from '../../../Applications/security/SecretManager';
import config from '../../../Commons/config';
import { getTokenFromAuthHeader } from '../../../Commons/utils';
import JwtTokenize from '../../../Applications/security/JwtTokenize';

const jwtTokenize = <JwtTokenize> container.getInstance('JwtTokenize');
const secretManager = <SecretManager> container.getInstance('SecretManager');

const verifyToken = async (token: string) => {
  const secret = await secretManager.getSecret(
    config.token.jwt.SECRET_NAME,
    config.token.jwt.SECRET_FIELD,
  );

  return jwtTokenize.verify(token, secret);
};

const decodeToken = async (token: string) => jwtTokenize.decode(token);

export const handler = async (event: CustomAuthorizerEvent)
  : Promise<CustomAuthorizerResult> => {
  const token = getTokenFromAuthHeader(event.authorizationToken);
  const isVerified = await verifyToken(token);

  if (!isVerified) {
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*',
          },
        ],
      },
    };
  }

  const { userId } = await decodeToken(token);

  return {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  };
};
