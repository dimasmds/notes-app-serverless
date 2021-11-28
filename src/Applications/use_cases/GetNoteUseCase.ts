import UseCaseDependencies from './definitions/UseCaseDependencies';
import JwtTokenize from '../security/JwtTokenize';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';

type UseCasePayload = {
  token: string,
  id: string
}

class GetNoteUseCase {
  private jwtTokenize: JwtTokenize;

  private noteRepository: NoteRepository;

  constructor({ jwtTokenize, noteRepository } : UseCaseDependencies) {
    this.jwtTokenize = jwtTokenize;
    this.noteRepository = noteRepository;
  }

  async execute({ token, id }: UseCasePayload) {
    const { userId } = await this.jwtTokenize.decode(token);
    const isOwner = await this.noteRepository.isNoteOwner(id, userId);

    if (!isOwner) throw new Error('GET_NOTE_USE_CASE.USER_NOT_OWNED_THE_NOTE');

    return this.noteRepository.getNoteById(id);
  }
}

export default GetNoteUseCase;
