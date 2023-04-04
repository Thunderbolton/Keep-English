import { Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';
import { useEntriesContext } from '../context/useEntriesContext';


const EntryForm = () => {


  const { dispatch } = useEntriesContext()

  // Entry Form state
  const [category, setCategory] = useState('Daily');
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((e.target as HTMLInputElement).value);
  };

  // Submitting form & adding new entry
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/entries', {title: title, comments: comments, category: category});
      // console.log(response.data)
      // console.log(response)
      if (response.data) {
        dispatch({type: 'create_entry', payload: response.data})
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setTitle('')
      setComments('')
    }
  }

  return (
    <div>
      {/* <Typography variant='h4'>Entry Form</Typography> */}
      <Box 
        sx={{my: 3}}>      
        <form action="" className="entry-form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
            sx={{my: 3}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                value={category}
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
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            label="Notes"
            multiline
            rows={4}
            required
          />

        <Button variant='contained' type='submit'>Add Entry</Button>
        </form> 
      </Box>
    </div>
  );
}

export default EntryForm

