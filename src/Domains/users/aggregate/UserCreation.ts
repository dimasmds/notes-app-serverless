import UserRepository from '../repository/UserRepository';
import IdGenerator from '../../../Applications/generator/IdGenerator';
import User from '../entities/User';
import NewUser from '../entities/NewUser';
import PasswordHash from '../../../Applications/security/PasswordHash';

type UserCreationDependencies = {
  userRepository: UserRepository,
  idGenerator: IdGenerator
  passwordHash: PasswordHash
}

type UserCreationPayload = {
  username: string,
  password: string
}

class UserCreation {
  private userRepository: UserRepository;

  private idGenerator: IdGenerator;

  private passwordHash: PasswordHash;

  constructor({ userRepository, idGenerator, passwordHash } : UserCreationDependencies) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
    this.passwordHash = passwordHash;
  }

  async create({ username, password } : UserCreationPayload): Promise<User> {
    const isUsernameAvailable = await this.userRepository.isUsernameAvailable(username);

    if (!isUsernameAvailable) throw new Error('USER_CREATION.USERNAME_ALREADY_TAKEN');

    const id = await this.idGenerator.generate('user');
    const hashedPassword = await this.passwordHash.hash(password);

    const newUser: NewUser = {
      id,
      username,
      password: hashedPassword,
    };

    return this.userRepository.persist(newUser);
  }
}

export default UserCreation;
