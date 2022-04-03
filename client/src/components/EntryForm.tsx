import axios from 'axios';
import { Typography, Button, TextField, InputLabel, FormControl, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

export type EntryFormProps = {
    title: string
}

const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('sumbitted');
}

const getEntries = () => {
  axios.get("http://localhost:5000/api/entries")
  .then(response => {
    console.log(response.data);
  }, error => {
    console.log(error);
  });
}

const EntryForm = (props: EntryFormProps) => {

  return (
    <div>

      <Typography variant='h4'>{props.title}</Typography>
      <Box 
        sx={{my: 5}}>      
        <form action="" className="entry-form" onSubmit={handleSubmit}>
          <TextField 
            sx={{my: 2}}
            label="Title" 
            variant="outlined" 
            required
          />

          <FormControl>
            <InputLabel id="select-label"></InputLabel>
            <TextField 
              sx={{my: 2}}
              label="Category"
              select
              required
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Exam">Exam</MenuItem>
            </TextField>
          </FormControl>

          <TextField 
            sx={{mt: 2, mb: 1}}
            label="Notes"
            multiline
            rows={4}
            required
          />

        <Button variant='contained' type='submit'>Add Entry</Button>
        </form>

        <Button onClick={getEntries}>get entries</Button>
      </Box>
      
    </div>
  );
}

export default EntryForm

