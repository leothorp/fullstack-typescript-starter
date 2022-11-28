import { NewNoteForm } from "@client/ NoteForm";
import { trpc } from "@client/store/auth";

export const NotesPage = () => {
  const { data, isLoading, isFetching } = trpc.api.getNotes.useQuery();

  if (isLoading || isFetching) {
    return <>Loading...</>;
  }
  return (
    <div>
      <h2 className="text-center">Notes</h2>
      {data &&
        data.map((n) => {
          return (
            <div key={n.id}>
              <p>{n.title}</p>
              <p>{n.content}</p>
            </div>
          );
        })}
      <h2 className="text-center">Add a Note</h2>
      <NewNoteForm />
    </div>
  );
};
