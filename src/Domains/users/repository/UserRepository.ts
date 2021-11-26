/* eslint-disable no-unused-vars */
import NewUser from '../entities/NewUser';
import User from '../entities/User';

interface UserRepository {
  persist(user: NewUser): Promise<User>;
  isUsernameAvailable(username: string): Promise<boolean>;
  getPasswordByUsername(username: string) : Promise<string | null>;
  getUserIdByUsername(username: string): Promise<string>;
}

export default UserRepository;
