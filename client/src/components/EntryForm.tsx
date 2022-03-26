export type EntryFormProps = {
    title: string
}

const EntryForm = (props: EntryFormProps) => {
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  );
}

export default EntryForm

