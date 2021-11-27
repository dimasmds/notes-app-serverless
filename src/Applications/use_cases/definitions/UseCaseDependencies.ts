import UserRepository from '../../../Domains/users/repository/UserRepository';
import IdGenerator from '../../generator/IdGenerator';
import PasswordHash from '../../security/PasswordHash';
import SecretManager from '../../security/SecretManager';
import JwtTokenize from '../../security/JwtTokenize';
import NoteRepository from '../../../Domains/notes/repository/NoteRepository';

type UseCaseDependencies = {
  userRepository: UserRepository,
  noteRepository: NoteRepository,
  idGenerator: IdGenerator,
  passwordHash: PasswordHash,
  secretManager: SecretManager,
  jwtTokenize: JwtTokenize
}

export default UseCaseDependencies;
