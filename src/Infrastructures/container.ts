import { createContainer, ParameterOption } from 'instances-container';
import UserRepositoryDynamoDB from './repositories/UserRepositoryDynamoDB';
import UUIDGenerator from './generator/UUIDGenerator';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import RegisterUserUseCase from '../Applications/use_cases/RegisterUserUseCase';

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
]);

/* use case */
container.register([
  {
    key: RegisterUserUseCase.name,
    Class: RegisterUserUseCase,
    parameter: useCaseParameter,
  },
]);

export default container;
