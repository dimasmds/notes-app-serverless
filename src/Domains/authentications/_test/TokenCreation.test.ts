import JwtTokenize from '../../../Applications/security/JwtTokenize';
import SecretManager from '../../../Applications/security/SecretManager';
import TokenCreation from '../TokenCreation';
import config from '../../../Commons/config';

describe('TokenCreation', () => {
  const mockJwtTokenize = <JwtTokenize>{};
  const mockSecretManager = <SecretManager>{};

  const tokenCreation = new TokenCreation({
    jwtTokenize: mockJwtTokenize,
    secretManager: mockSecretManager,
  });

  describe('create', () => {
    it('should create token correctly', async () => {
      // Arrange
      mockSecretManager.getSecret = jest.fn(() => Promise.resolve('shh'));
      mockJwtTokenize.createToken = jest.fn(() => Promise.resolve('access.token'));
      const payload = { userId: 'user-123' };

      // Action
      const token = await tokenCreation.create(payload);

      // Assert
      expect(token).toBe('access.token');
      expect(mockSecretManager.getSecret).toBeCalledWith(
        config.token.jwt.SECRET_FIELD, config.token.jwt.SECRET_NAME,
      );
      expect(mockJwtTokenize.createToken).toBeCalledWith(
        payload, 'shh', config.token.jwt.EXPIRES_TIME,
      );
    });
  });
});
