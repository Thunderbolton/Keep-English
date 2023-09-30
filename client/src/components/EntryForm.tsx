import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
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
      const response = await axios.post('https://keep-english-api.onrender.com/api/entries', 
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
      <Typography variant='h4' sx={{ mt: 4 }}>Create a new Entry</Typography>
      <Box className='entry-form-container'
        sx={{ my: 1 }}>      
        <form action="" className="entry-form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
            sx={{ my: 3, ...textfieldStyle }}
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
          <FormControl sx={{ border: 2, borderColor: infoLightColor, borderRadius: 1, display: 'flex' }}>
            <FormLabel id="radio-buttons-group" sx={{ color: primaryColor, mt: 0.5 }}>Category</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group"
                name="radio-buttons-group"
                row
                sx={{margin: 'auto', px: 1, color: infoColor,
                '&.Mui-checked': {
                  color: buttonColor }}}
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
            sx={{ bgcolor: title && comments ? primaryColor : buttonColor, "&:hover": { bgcolor: buttonColor }, mt: 2}}
            variant='contained' 
            type='submit'>{buttonText}
          </Button>
        </form> 
      </Box>
    </div>
  );
}

export default EntryForm

