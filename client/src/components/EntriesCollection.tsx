const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>

          {entries.map((entry:any) => (
            <li>{entry._id}</li>
          ))}
      </div>
    );
  }
  
  export default EntriesCollection