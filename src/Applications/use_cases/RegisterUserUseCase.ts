import UserRepository from '../../Domains/users/repository/UserRepository';
import IdGenerator from '../generator/IdGenerator';
import PasswordHash from '../security/PasswordHash';
import UserCreation from '../../Domains/users/aggregate/UserCreation';
import UseCaseDependencies from './definitions/UseCaseDependencies';
import User from '../../Domains/users/entities/User';

type UseCasePayload = {
  username: string,
  password: string
}

class RegisterUserUseCase {
  private readonly userRepository: UserRepository;

  private readonly idGenerator: IdGenerator;

  private readonly passwordHash: PasswordHash;

  constructor({
    userRepository,
    idGenerator,
    passwordHash,
  } : UseCaseDependencies) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
    this.passwordHash = passwordHash;
  }

  async execute({ username, password }: UseCasePayload) : Promise<User> {
    const userCreation = new UserCreation({
      userRepository: this.userRepository,
      idGenerator: this.idGenerator,
      passwordHash: this.passwordHash,
    });

    return userCreation.create({ username, password });
  }
}

export default RegisterUserUseCase;
