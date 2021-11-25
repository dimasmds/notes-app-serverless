import UserRepository from '../../../Domains/users/repository/UserRepository';
import IdGenerator from '../../generator/IdGenerator';
import PasswordHash from '../../security/PasswordHash';

type UseCaseDependencies = {
  userRepository: UserRepository,
  idGenerator: IdGenerator,
  passwordHash: PasswordHash,
}

export default UseCaseDependencies;
