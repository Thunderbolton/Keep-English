import EntryCard from './EntryCard';
import { Container, Grid } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const EntriesCollection = ({entries} : {entries:any}) => {

    const { user } = useContext(AuthContext)

    return (
      <div>
          {user ? <h1>Entries collection</h1> : <h2>Please sign in to see your entries</h2>}
          
          <Container>
            <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>
              {entries.map((entry:any) => (
                <Grid item key={entry._id}>
                  <EntryCard entries={entry} />
                </Grid>
              ))}  
            </Grid>  
          </Container>
          
          
      </div>
    );
  }
  
  export default EntriesCollection