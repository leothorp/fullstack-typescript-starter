import { useForm } from "react-hook-form";
import BaseForm, { BaseInput, BaseTextarea } from "@client/forms/BaseForm";
import { trpc } from "@client/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewNote, NewNoteInputSchema } from "@server/schemas";
import { Button } from "flowbite-react";

type FormValues = NewNote;

const NoteForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(NewNoteInputSchema),

    defaultValues: { title: "", content: "" },
  });

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <BaseInput placeholder="Title" {...register("title")} />
      <BaseTextarea placeholder="Content" {...register("content")} />

      <Button type="submit" className="min-w-[100px]" disabled={!isValid}>
        Save
      </Button>
    </BaseForm>
  );
};

export const NewNoteForm = () => {
  const utils = trpc.useContext();

  const createNoteMutation = trpc.api.createNote.useMutation({
    onSuccess() {
      //triggers refetch of all notes on creation
      utils.api.getNotes.invalidate();
    },
  });
  return <NoteForm onSubmit={createNoteMutation.mutate} />;
};
