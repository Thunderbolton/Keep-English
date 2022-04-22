import { Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

export type EntryFormProps = {
    title: string
}

const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('sumbitted');
}


const EntryForm = (props: EntryFormProps) => {

  // Radio buttons state
  const [value, setValue] = useState('Daily');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


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

          <FormControl sx={{border: 1, borderColor:'#0000003b', borderRadius:1}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group"
                name="radio-buttons-group"
                row
                sx={{margin: 'auto'}}
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                <FormControlLabel value="Business" control={<Radio />} label="Business" />
                <FormControlLabel value="Travel" control={<Radio />} label="Travel" />
                <FormControlLabel value="Exam" control={<Radio />} label="Exam" />
              </RadioGroup>
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

        {/* <Button onClick={getEntries}>get entries</Button> */}
        
      </Box>
      
    </div>
  );
}

export default EntryForm

