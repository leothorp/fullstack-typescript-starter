import { useForm } from "react-hook-form";
import BaseForm, { BaseInput, BaseTextarea } from "@client/forms/BaseForm";
import { trpc } from "@client/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewNoteInputSchema } from "@server/schemas";

const NoteForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(NewNoteInputSchema),

    defaultValues: { title: "", content: "" },
  });

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      {/* <BaseInput autoFocus={true} {...register("title", { requlred: true })} /> */}
      <BaseInput autoFocus={true} {...register("title")} />
      {/* <BaseTextarea
        multiline="true"
        {...register("content", { requlred: true })}
      /> */}
      <BaseTextarea multiline="true" {...register("content")} />

      <button type="submit" disabled={!isValid}>
        Save
      </button>
    </BaseForm>
  );
};

export const NewNoteForm = () => {
  const createNoteMutation = trpc.api.createNote.useMutation();
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
