import UseCaseDependencies from './definitions/UseCaseDependencies';
import NoteRepository from '../../Domains/notes/repository/NoteRepository';
import JwtTokenize from '../security/JwtTokenize';
import IdGenerator from '../generator/IdGenerator';
import StorageService from '../storage/StorageService';
import config from '../../Commons/config';

type UseCasePayload = {
  token: string,
  noteId: string,
};

class UpdateAttachmentUseCase {
  private noteRepository: NoteRepository;

  private idGenerator: IdGenerator;

  private jwtTokenize: JwtTokenize;

  private storageService: StorageService;

  constructor({
    noteRepository, idGenerator, jwtTokenize, storageService,
  }: UseCaseDependencies) {
    this.noteRepository = noteRepository;
    this.idGenerator = idGenerator;
    this.jwtTokenize = jwtTokenize;
    this.storageService = storageService;
  }

  async execute({ token, noteId } : UseCasePayload) {
    const { userId } = await this.jwtTokenize.decode(token);
    const note = await this.noteRepository.getNoteById(noteId);

    if (note === null) throw new Error('UPDATE_ATTACHMENT_USE_CASE.NOTE_NOT_FOUND');
    if (note.userId !== userId) throw new Error('UPDATE_ATTACHMENT_USE_CASE.USER_NOT_OWNER');

    const attachmentId = await this.idGenerator.generate();
    await this.noteRepository.addAttachment(noteId, `https://${config.s3.buckets.attachments.NAME}.s3.amazonaws.com/${attachmentId}`);
    return this.storageService.getPutPreSignedUrl(attachmentId);
  }
}

export default UpdateAttachmentUseCase;
