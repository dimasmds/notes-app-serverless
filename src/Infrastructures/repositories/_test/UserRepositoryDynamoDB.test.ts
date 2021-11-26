import UserRepositoryDynamoDB from '../UserRepositoryDynamoDB';
import UsersTableDynamoDBHelper from './helper/UsersTableDynamoDBHelper';
import NewUser from '../../../Domains/users/entities/NewUser';

describe('UserRepositoryDynamoDB', () => {
  const userRepository = new UserRepositoryDynamoDB();

  beforeEach(async () => {
    await UsersTableDynamoDBHelper.clean();
  });

  describe('isUsernameAvailable', () => {
    it('should return true if username available', async () => {
      const result = await userRepository.isUsernameAvailable('test');
      expect(result).toBe(true);
    });

    it('should return false if username not available', async () => {
      await UsersTableDynamoDBHelper.addUser();
      const result = await userRepository.isUsernameAvailable('dimasmds');
      expect(result).toBe(false);
    });
  });

  describe('persist', () => {
    it('should persist new user correctly and return persisted user', async () => {
      // Arrange
      const newUser: NewUser = {
        id: 'user-321',
        username: 'dimasmds',
        password: 'hashedPassword',
      };

      // Action
      const user = await userRepository.persist(newUser);

      // Assert
      const Items = await UsersTableDynamoDBHelper.findUsersById(newUser.id);
      expect(Items).toHaveLength(1);
      expect(user).toEqual({
        id: 'user-321',
        username: 'dimasmds',
      });
    });
  });

  describe('getPasswordByUsername', () => {
    it('should return null if not found', async () => {
      const result = await userRepository.getPasswordByUsername('test');
      expect(result).toBeNull();
    });

    it('should return password if found', async () => {
      await UsersTableDynamoDBHelper.addUser({ password: 'hashedPassword' });
      const result = await userRepository.getPasswordByUsername('dimasmds');
      expect(result).toBe('hashedPassword');
    });
  });

  describe('getUserIdByUsername', () => {
    it('should throw error when username not found', () => {
      expect(userRepository.getUserIdByUsername('test')).rejects.toThrow();
    });

    it('should return userId by username', async () => {
      await UsersTableDynamoDBHelper.addUser({ id: 'user-123' });
      const result = await userRepository.getUserIdByUsername('dimasmds');
      expect(result).toBe('user-123');
    });
  });
});
