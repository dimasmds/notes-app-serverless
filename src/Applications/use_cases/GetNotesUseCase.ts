import UseCaseDependencies from './definitions/UseCaseDependencies';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import JwtTokenize from '../security/JwtTokenize';

type UseCasePayload = {
  token: string;
};

class GetNotesUseCase {
  private noteRepository: NoteRepository;

  private jwtTokenize: JwtTokenize;

  constructor({ noteRepository, jwtTokenize } : UseCaseDependencies) {
    this.noteRepository = noteRepository;
    this.jwtTokenize = jwtTokenize;
  }

  async execute({ token } : UseCasePayload) {
    const { userId } = await this.jwtTokenize.decode(token);
    return this.noteRepository.getAllUnarchivedByUser(userId);
  }
}

export default GetNotesUseCase;
