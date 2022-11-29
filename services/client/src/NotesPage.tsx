import { NewNoteForm } from "@client/NoteForm";
import { trpc } from "@client/store/auth";

export const NotesPage = () => {
  const { data, isLoading, isFetching } = trpc.api.getNotes.useQuery();

  if (isLoading || isFetching) {
    return <>Loading...</>;
  }
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-center mb-4">Notes</h2>
      {data &&
        data.map((n) => {
          return (
            <div key={n.id} className="mb-4">
              <p>{n.title}</p>
              <p>{n.content}</p>
            </div>
          );
        })}
      <h2 className="text-center mt-4">Add a Note</h2>
      <NewNoteForm />
    </div>
  );
};
