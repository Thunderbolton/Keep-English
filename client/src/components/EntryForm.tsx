import { Typography, Button, TextField, InputLabel, FormControl, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

export type EntryFormProps = {
    title: string
}

const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('sumbitted');
}

// Radio buttons state


const EntryForm = (props: EntryFormProps) => {

  const [value, setValue] = useState('Daily');

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
            {/* <InputLabel id="select-label"></InputLabel>
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
            </TextField> */}
            <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                // onChange={handleChange}
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
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

