/* eslint-disable no-unused-vars */
interface PasswordHash {
  hash(password: string): Promise<string>
  compare(password: string, hash: string): Promise<boolean>
}

export default PasswordHash;
