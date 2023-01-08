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
      <BaseTextarea
        // className="w-full text-md mb-1"
        placeholder="Content"
        {...register("content")}
      />

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
      utils.api.getNotes.invalidate();
      // utils.notes.byId.invalidate({ id: input.id }); // Will not invalidate queries for other id's 👍
    },
  });
  return <NoteForm onSubmit={createNoteMutation.mutate} />;
};
//   const {
//     register,

//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm({ mode: "onChange" });
//   console.log(isValid);
//   const { createThought } = props;
//   const onSubmit = (data) => createThought(data);
//   console.log(errors);

//   return (
//     <BaseForm onSubmit={handleSubmit(onSubmit)}>
//       <input autoFocus={true} {...register("title", { required: true })} />
//       <textarea {...register("description")} />

//       <input type="submit" disabled={!isValid} />
//     </BaseForm>
//   );
