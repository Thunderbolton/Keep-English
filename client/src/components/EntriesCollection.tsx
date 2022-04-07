
interface Props {
    entries: string[]
    createdAt?: string[]
}

const EntriesCollection = ({entries}: Props) => {
    console.log(entries)

    return (
      <div>
          <h1>Entries collection</h1>

          {entries.map((entry) => (
            <li>{entry.createdAt}</li>
          ))}
      </div>
    );
  }
  
  export default EntriesCollection