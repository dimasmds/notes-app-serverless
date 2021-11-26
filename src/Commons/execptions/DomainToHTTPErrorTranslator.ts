import InvariantError from './InvariantError';

class DomainToHttpErrorTranslator {
  static Directories: any = {
    'USER_CREATION.USERNAME_ALREADY_TAKEN': new InvariantError('username already taken'),
  }

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
