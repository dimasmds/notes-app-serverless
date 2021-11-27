import InvariantError from './InvariantError';
import NotFoundError from './NotFoundError';
import AuthenticationError from './AuthenticationError';

class DomainToHttpErrorTranslator {
  static Directories: any = {
    'USER_CREATION.USERNAME_ALREADY_TAKEN': new InvariantError('username already taken'),
    'USER_LOGIN.USERNAME_NOT_FOUND': new NotFoundError('username is not found'),
    'USER_LOGIN.PASSWORD_IS_NOT_VALID': new AuthenticationError('wrong password'),
  }

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
