import InvariantError from './InvariantError';
import NotFoundError from './NotFoundError';
import AuthenticationError from './AuthenticationError';
import AuthorizationError from './AuthorizationError';

class DomainToHttpErrorTranslator {
  static Directories: any = {
    'USER_CREATION.USERNAME_ALREADY_TAKEN': new InvariantError('username already taken'),
    'USER_LOGIN.USERNAME_NOT_FOUND': new NotFoundError('username is not found'),
    'USER_LOGIN.PASSWORD_IS_NOT_VALID': new AuthenticationError('wrong password'),
    'GET_NOTE_USE_CASE.NOTE_NOT_FOUND': new NotFoundError('note is not found'),
    'GET_NOTE_USE_CASE.USER_NOT_OWNED_THE_NOTE': new AuthorizationError('you are not allowed to access this note'),
    'NOTE_REPLACEMENT.NOTE_NOT_FOUND': new NotFoundError('note is not found'),
    'NOTE_REPLACEMENT.USER_NOT_OWNER': new AuthorizationError('you are not allowed to access this note'),
  }

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
