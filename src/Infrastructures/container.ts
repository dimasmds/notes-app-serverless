import { createContainer, ParameterOption } from 'instances-container';
import UserRepositoryDynamoDB from './repositories/UserRepositoryDynamoDB';
import UUIDGenerator from './generator/UUIDGenerator';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import RegisterUserUseCase from '../Applications/use_cases/RegisterUserUseCase';
import AWSSecretsManager from './security/AWSSecretsManager';
import JwtTokenizeImpl from './security/JwtTokenizeImpl';
import LoginUseCase from '../Applications/use_cases/LoginUseCase';

const container = createContainer();

const useCaseParameter: ParameterOption = {
  injectType: 'destructuring',
  dependencies: [
    {
      name: 'userRepository',
      internal: 'UserRepository',
    },
    {
      name: 'idGenerator',
      internal: 'IdGenerator',
    },
    {
      name: 'passwordHash',
      internal: 'PasswordHash',
    },
    {
      name: 'secretManager',
      internal: 'SecretManager',
    },
    {
      name: 'jwtTokenize',
      internal: 'JwtTokenize',
    },
  ],
};

/* Infrastructure */
container.register([
  {
    key: 'UserRepository',
    Class: UserRepositoryDynamoDB,
  },
  {
    key: 'IdGenerator',
    Class: UUIDGenerator,
  },
  {
    key: 'PasswordHash',
    Class: BcryptPasswordHash,
  },
  {
    key: 'SecretManager',
    Class: AWSSecretsManager,
  },
  {
    key: 'JwtTokenize',
    Class: JwtTokenizeImpl,
  },
]);

/* use case */
container.register([
  {
    key: RegisterUserUseCase.name,
    Class: RegisterUserUseCase,
    parameter: useCaseParameter,
  },
  {
    key: LoginUseCase.name,
    Class: LoginUseCase,
    parameter: useCaseParameter,
  },
]);

export default container;
