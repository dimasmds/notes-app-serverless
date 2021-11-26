import UserRepository from '../repository/UserRepository';
import PasswordHash from '../../../Applications/security/PasswordHash';

type UserLoginDependencies = {
  userRepository: UserRepository,
  passwordHash: PasswordHash,
}

type UserLoginPayload = {
  username: string,
  password: string,
}

class UserLogin {
  private userRepository: UserRepository;

  private passwordHash: PasswordHash;

  constructor({ userRepository, passwordHash } : UserLoginDependencies) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async login({ username, password }: UserLoginPayload) {
    const hashedPassword = await this.userRepository.getPasswordByUsername(username);

    if (!hashedPassword) throw new Error('USER_LOGIN.USERNAME_NOT_FOUND');

    const isPasswordValid = await this.passwordHash.compare(password, hashedPassword);

    if (!isPasswordValid) throw new Error('USER_LOGIN.PASSWORD_IS_NOT_VALID');

    return this.userRepository.getUserIdByUsername(username);
  }
}

export default UserLogin;
