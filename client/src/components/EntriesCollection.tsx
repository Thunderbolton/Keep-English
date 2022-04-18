import EntryCard from './EntryCard';

import { Container } from '@mui/material';

const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>
          
          <Container>
              <EntryCard entries={entries}/>
          </Container>
          
          
      </div>
    );
  }
  
  export default EntriesCollection