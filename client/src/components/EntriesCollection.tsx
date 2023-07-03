import EntryCard from './EntryCard';
import EntriesSort from './EntriesSort';
import { Container, Grid, Typography, } from '@mui/material';
import { useContext, useState } from 'react';
import { EntriesContext } from "../context/EntryContext";
import { AuthContext } from "../context/AuthContext";

const EntriesCollection = () => {

    const { entries: userEntries } = useContext(EntriesContext)
    const { user } = useContext(AuthContext)

    const [selectedCategory, setSelectedCategory] = useState('');

    console.log(selectedCategory)

    return (
      <>
          {userEntries.length === 0 ? (
            <Typography variant='h5'>Create your first entry now!</Typography>
          ) : <Typography variant='h5'>Entries Collection</Typography>}
          {user && (
            <>
              <EntriesSort onCategoryChange={setSelectedCategory} />
              <Container className='entries-collection-container'>
              <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>

              {userEntries.map((entry: any) => {
                if (!selectedCategory || selectedCategory === 'All') {
                  return (
                    <Grid item key={entry._id}>
                      <EntryCard entry={entry} />
                    </Grid>
                  )};
                
                if (entry.category === selectedCategory) {
                  return (
                    <Grid item key={entry._id}>
                      <EntryCard entry={entry} />
                    </Grid>
                  )};
              })}
              </Grid>  
            </Container>
          </>
           )}
           
      </>
    );
  }
  
  export default EntriesCollection