import UseCaseDependencies from './definitions/UseCaseDependencies';
import UserLogin from '../../Domains/users/aggregate/UserLogin';
import UserRepository from '../../Domains/users/repository/UserRepository';
import JwtTokenize from '../security/JwtTokenize';
import SecretManager from '../security/SecretManager';
import PasswordHash from '../security/PasswordHash';
import TokenCreation from '../../Domains/authentications/TokenCreation';

type UseCasePayload = {
  username: string,
  password: string
}

class LoginUseCase {
  private readonly userRepository: UserRepository;

  private readonly jwtTokenize: JwtTokenize;

  private readonly secretManager: SecretManager;

  private readonly passwordHash: PasswordHash;

  constructor({
    userRepository, passwordHash, jwtTokenize, secretManager,
  }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.jwtTokenize = jwtTokenize;
    this.secretManager = secretManager;
  }

  async execute(payload: UseCasePayload) {
    const userLogin = new UserLogin({
      userRepository: this.userRepository,
      passwordHash: this.passwordHash,
    });
    const tokenCreation = new TokenCreation({
      jwtTokenize: this.jwtTokenize,
      secretManager: this.secretManager,
    });

    const userId = await userLogin.login(payload);
    return tokenCreation.create({ userId });
  }
}

export default LoginUseCase;
