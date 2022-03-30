import { Typography, Button, TextField, InputLabel, FormControl, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

export type EntryFormProps = {
    title: string
}

const EntryForm = (props: EntryFormProps) => {

  return (
    <div>

      <Typography variant='h4'>{props.title}</Typography>
      <Box 
        sx={{my: 5}}>      
        <form action="" className="entry-form">
          <TextField 
            sx={{my: 2}}
            label="Title" 
            variant="outlined" 
          />

          <FormControl>
            <InputLabel id="select-label"></InputLabel>
            <TextField 
              sx={{my: 2}}
              label="Category"
              select
            >
              <MenuItem value={"Daily"}>Daily</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Travel"}>Travel</MenuItem>
              <MenuItem value={"Exam"}>Exam</MenuItem>
            </TextField>
          </FormControl>

          <TextField 
            sx={{mt: 2, mb: 1}}
            label="Notes"
            multiline
            rows={4}
          />
        </form>
      </Box>
      <Button variant='contained'>Add Entry</Button>
    </div>
  );
}

export default EntryForm

