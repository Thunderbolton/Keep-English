import { Card } from '@mui/material';


const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>

          {entries.map((entry:any) => (
            <ul>
              <Card variant='outlined'>
                <li>{entry._id}</li>
                <li>{entry.text}</li>
              </Card>
            </ul>
            
            
          ))}
      </div>
    );
  }
  
  export default EntriesCollection