import { z } from "zod";
export const LoginOutputSchema = z.object({
  accessToken: z.string(),
  email: z.string().email(),
  id: z.number(),
});

export const NoteSchema = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});

export const NotesOutputSchema = z.array(NoteSchema);

export const NewNoteInputSchema = NoteSchema.omit({ id: true });
