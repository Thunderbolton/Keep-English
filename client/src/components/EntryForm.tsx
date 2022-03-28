import { Typography, Button, Select, TextField, InputLabel, FormControl, MenuItem } from '@mui/material';

export type EntryFormProps = {
    title: string
}


const EntryForm = (props: EntryFormProps) => {
  return (
    <div>
      <Typography variant='h4'>{props.title}</Typography>
      
      <form action="" className="entry-form">
        <TextField 
          className="entry-form-input" 
          label="Title" 
          variant="outlined" 
          />
          
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
          >
            <MenuItem value={"Daily"}>Daily</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Exam"}>Exam</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Notes"
          className="entry-form-input"
          multiline
          rows={4}
        />
    
      </form>

      <Button variant='contained' className="entry-button">Add Entry</Button>
    </div>
  );
}

export default EntryForm

