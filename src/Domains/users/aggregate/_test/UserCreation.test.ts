import UserCreation from '../UserCreation';
import UserRepository from '../../repository/UserRepository';
import IdGenerator from '../../../../Applications/generator/IdGenerator';
import PasswordHash from '../../../../Applications/security/PasswordHash';

describe('UserCreation', () => {
  const mockUserRepository = <UserRepository>{};
  const mockIdGenerator = <IdGenerator>{};
  const mockPasswordHash = <PasswordHash>{};

  const userCreation = new UserCreation({
    userRepository: mockUserRepository,
    idGenerator: mockIdGenerator,
    passwordHash: mockPasswordHash,
  });

  describe('create', () => {
    it('should throw error when username not available', async () => {
      mockUserRepository.isUsernameAvailable = jest.fn(() => Promise.resolve(false));

      await expect(userCreation.create({
        username: 'username',
        password: 'password',
      })).rejects.toThrowError('USER_CREATION.USERNAME_ALREADY_TAKEN');

      expect(mockUserRepository.isUsernameAvailable).toHaveBeenCalledWith('username');
    });

    it('should persist new user correctly', async () => {
      mockUserRepository.isUsernameAvailable = jest.fn(() => Promise.resolve(true));
      mockIdGenerator.generate = jest.fn(() => Promise.resolve('user-123'));
      mockPasswordHash.hash = jest.fn(() => Promise.resolve('hashedPassword'));
      mockUserRepository.persist = jest.fn(() => Promise.resolve({
        id: 'user-123',
        username: 'username',
      }));

      const user = await userCreation.create({
        username: 'username',
        password: 'password',
      });

      expect(mockUserRepository.isUsernameAvailable).toHaveBeenCalledWith('username');
      expect(mockIdGenerator.generate).toHaveBeenCalled();
      expect(mockPasswordHash.hash).toHaveBeenCalledWith('password');
      expect(mockUserRepository.persist).toBeCalledWith({
        id: 'user-123',
        username: 'username',
        password: 'hashedPassword',
      });
      expect(user).toEqual({
        id: 'user-123',
        username: 'username',
      });
    });
  });
});
