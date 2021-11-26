import JwtTokenize from '../../Applications/security/JwtTokenize';
import SecretManager from '../../Applications/security/SecretManager';
import config from '../../Commons/config';

type TokenCreationDependencies = {
  jwtTokenize: JwtTokenize,
  secretManager: SecretManager
}

type TokenCreationPayload = {
  userId: string
}

class TokenCreation {
  private jwtTokenize: JwtTokenize;

  private secretManager: SecretManager;

  constructor({ jwtTokenize, secretManager } : TokenCreationDependencies) {
    this.jwtTokenize = jwtTokenize;
    this.secretManager = secretManager;
  }

  async create(payload : TokenCreationPayload) {
    const secret = await this.secretManager.getSecret(
      config.token.jwt.SECRET_NAME,
      config.token.jwt.SECRET_FIELD,
    );

    return this.jwtTokenize.createToken(payload, secret, Number(config.token.jwt.EXPIRES_TIME));
  }
}

export default TokenCreation;
