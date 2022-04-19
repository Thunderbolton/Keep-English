import EntryCard from './EntryCard';

import { Container, Grid } from '@mui/material';

const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>
          
          <Container>
            <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>
              {entries.map((entry:any) => (
                <Grid item>
                  <EntryCard entries={entry} />
                </Grid>
              ))}  
            </Grid>  
          </Container>
          
          
      </div>
    );
  }
  
  export default EntriesCollection