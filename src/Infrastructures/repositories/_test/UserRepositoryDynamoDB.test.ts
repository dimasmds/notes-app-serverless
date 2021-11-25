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
});
