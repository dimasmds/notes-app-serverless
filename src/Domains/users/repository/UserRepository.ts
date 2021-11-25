/* eslint-disable no-unused-vars */
import NewUser from '../entities/NewUser';
import User from '../entities/User';

interface UserRepository {
  persist(user: NewUser): Promise<User>;
  isUsernameAvailable(username: string): Promise<boolean>;
}

export default UserRepository;
