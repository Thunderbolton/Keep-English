import EntryCard from './EntryCard';
import EntriesSort from './EntriesSort';
import { Container, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { EntriesContext } from "../context/EntryContext";
import { AuthContext } from "../context/AuthContext";

const EntriesCollection = () => {
  
  const { entries: userEntries } = useContext(EntriesContext);
  const { user } = useContext(AuthContext);

  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className='entries-collection'>
      {userEntries.length === 0 ? (
        <Typography variant='h5'>Create your first entry now!</Typography>
      ) : (
        <Typography variant='h4'>Entries Collection</Typography>
      )}
      {user && (
        <div className='sorted-entries'>
          <EntriesSort onCategoryChange={setSelectedCategory} />
          <Container className='entries-collection-container' >
            <Grid container justifyContent="space-evenly" alignItems="center" gap={6}>

              {userEntries.map((entry: any) => {
                if (!selectedCategory || selectedCategory === 'All') {
                  return (
                    <Grid item key={entry._id}>
                      <EntryCard entry={entry} />
                    </Grid>
                  );
                }
                if (entry.category === selectedCategory) {
                  return (
                    <Grid item key={entry._id}>
                      <EntryCard entry={entry} />
                    </Grid>
                  );
                }
                return null;
              })}

             {selectedCategory && userEntries.length > 0 && selectedCategory !== 'All' && !userEntries.some((entry: any) => entry.category === selectedCategory) && (
              <Grid item>
                <Typography variant='h5'>No {selectedCategory} entries. Create your first now!</Typography>
              </Grid>
            )}
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

export default EntriesCollection;
