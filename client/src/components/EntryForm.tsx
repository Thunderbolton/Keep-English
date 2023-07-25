import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import axios from 'axios';
import { useContext, useState } from 'react';
import { EntriesContext } from '../context/EntryContext';
import { AuthContext } from "../context/AuthContext";


const EntryForm = () => {

  const { dispatch } = useContext(EntriesContext)
  const { user } = useContext(AuthContext)

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  // const primaryLightColor = theme.palette.primary.light;

  const infoColor = theme.palette.info.main;
  const infoLightColor = theme.palette.info.light;


  // Entry Form state
  const [category, setCategory] = useState('Daily');
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');

  const [buttonText, setButtonText] = useState('Add Entry')
  const [buttonColor, setButtonColor] = useState<'error' | '#69a3be'>('#69a3be');


  const textfieldStyle = {
    "& label.Mui-focused": {
      color: infoLightColor,
    },
    "& .MuiOutlinedInput-root": {
      '&:hover fieldset': {
        borderColor: infoColor,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 2, borderColor: infoLightColor, borderRadius: 1
    },
    // "& .MuiInputBase-input": {
    //   color: primaryLightColor,
    // }, /// INPUT TEXT COLOUR
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((e.target as HTMLInputElement).value);
  };

  // Submitting form & adding new entry
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!user) {
      setButtonText('Sign in to add entry')
      setButtonColor('error')
      return
    }

    try {
      const response = await axios.post('/api/entries', 
        { title: title, comments: comments, category: category },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
    );
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
      <Box className='entry-form-container'
        sx={{my: 3}}>      
        <form action="" className="entry-form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
            sx={{my: 3, ...textfieldStyle}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined" 
            required
            color="info"
            label="Title" 
            InputLabelProps={{
              style: { color: primaryColor },
            }}
          />
          <FormControl sx={{border: 2, borderColor: infoLightColor, borderRadius: 1}}>
            <FormLabel id="radio-buttons-group">Category</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group"
                name="radio-buttons-group"
                row
                sx={{margin: 'auto', color: 'gray',
                '&.Mui-checked': {
                  color: buttonColor}}}
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
            sx={{mt: 2, ...textfieldStyle }}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            label="Notes"
            InputLabelProps={{
              style: { color: primaryColor },
            }}
            color="info" 
            multiline
            rows={4}
            required
          />
       
          <Button 
            variant='contained' 
            
            sx={{ bgcolor: title && comments ? primaryColor : buttonColor, "&:hover": { bgcolor: buttonColor }, mt: 1}} type='submit'>{buttonText}
          </Button>
        </form> 
      </Box>
    </div>
  );
}

export default EntryForm

