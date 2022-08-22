import { Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';


const EntryForm = () => {

  // Radio buttons state
  const [value, setValue] = useState('Daily');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
  };

  // Submitting form & adding new entry
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const response = await axios.post('/api/entries', {
      title: 'new entry',
      comments: 'This is a test for adding a new entry'
    })
    console.log(response);
  }


  return (
    <div>
      <Typography variant='h4'>Entry Form</Typography>
      <Box 
        sx={{my: 3}}>      
        <form action="" className="entry-form" onSubmit={handleSubmit}>
          <TextField 
            sx={{my: 3}}
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

