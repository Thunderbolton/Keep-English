import EntryCard from './EntryCard';
import { Container, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { EntriesContext } from "../context/EntryContext";
import { AuthContext } from "../context/AuthContext";

const EntriesCollection = () => {

    const { entries: userEntries } = useContext(EntriesContext)
    const { user } = useContext(AuthContext)

    return (
      <>
          {userEntries.length === 0 ? (
            <Typography variant='h5'>Create your first entry now!</Typography>
          ) : <Typography variant='h5'>Entries Collection</Typography>}
          {user && (
            <Container className='entries-collection-container'>
            <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>
              {userEntries.map((entry: any) => (
                <Grid item key={entry._id}>
                  <EntryCard entries={entry} />
                </Grid>
              ))}  
            </Grid>  
          </Container>
           )}
           
      </>
    );
  }
  
  export default EntriesCollection