import EntryCard from './EntryCard';
import { Container, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { EntriesContext } from "../context/EntryContext";

const EntriesCollection = ({ entries } : { entries: any[] }) => {

    const { entries: userEntries } = useContext(EntriesContext)

    return (
      <>
          {userEntries.length === 0 ? (
            <Typography variant='h5'>Create your first entry now!</Typography>
          ) : <Typography variant='h5'>Entries Collection</Typography>}
          
          <Container className='entries-collection-container'>
            <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>
              {entries.map((entry:any) => (
                <Grid item key={entry._id}>
                  <EntryCard entries={entry} />
                </Grid>
              ))}  
            </Grid>  
          </Container>
          
      </>
    );
  }
  
  export default EntriesCollection