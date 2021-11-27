type Note = {
  id: string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  owner: string;
  collaborators: string[];
}

export default Note;
