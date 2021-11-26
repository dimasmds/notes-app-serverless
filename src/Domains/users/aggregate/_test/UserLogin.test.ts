import UserRepository from '../../repository/UserRepository';
import PasswordHash from '../../../../Applications/security/PasswordHash';
import UserLogin from '../UserLogin';

describe('UserLogin', () => {
  const mockUserRepository = <UserRepository>{};
  const mockPasswordHash = <PasswordHash>{};

  const userLogin = new UserLogin({
    userRepository: mockUserRepository,
    passwordHash: mockPasswordHash,
  });

  describe('login', () => {
    it('should throw error when username is not found', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve(null));
      const payload = {
        username: 'dimasmds',
        password: 'hello123',
      };

      // Action
      await expect(userLogin.login(payload)).rejects.toThrowError('USER_LOGIN.USERNAME_NOT_FOUND');
      expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(payload.username);
    });

    it('should throw error when password not match', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve('hashedPassword'));
      mockPasswordHash.compare = jest.fn(() => Promise.resolve(false));
      const payload = {
        username: 'dimasmds',
        password: '12345',
      };

      // Action
      await expect(userLogin.login(payload)).rejects.toThrowError('USER_LOGIN.PASSWORD_IS_NOT_VALID');
      expect(mockPasswordHash.compare).toBeCalledWith(payload.password, 'hashedPassword');
    });

    it('should return user id when all correct', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve('hashedPassword'));
      mockPasswordHash.compare = jest.fn(() => Promise.resolve(true));
      mockUserRepository.getUserIdByUsername = jest.fn(() => Promise.resolve('user-123'));
      const payload = {
        username: 'dimasmds',
        password: 'hello123',
      };

      // Action
      const userId = await userLogin.login(payload);
      expect(userId).toBe('user-123');
      expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(payload.username);
      expect(mockPasswordHash.compare).toBeCalledWith(payload.password, 'hashedPassword');
    });
  });
});
