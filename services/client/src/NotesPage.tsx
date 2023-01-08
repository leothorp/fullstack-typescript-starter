import { LoadingSpinner } from "@client/LoadingSpinner";
import { NewNoteForm } from "@client/NoteForm";
import { trpc } from "@client/store/auth";

export const NotesPage = () => {
  const { data, isLoading, isFetching } = trpc.api.getNotes.useQuery();

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-center mb-4 text-2xl">Notes</h1>
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
