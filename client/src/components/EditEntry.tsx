import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const EditEntry = ({entries} : {entries:any}) => {

    // Select category state
    const [category, setCategory] = useState(entries.category);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((e.target as HTMLInputElement).value);
      };

    return ( 
            <form>
                <Stack spacing={2}>
                    <TextField size="small" label="Title" margin="dense" />
    
                    <TextField size="small" label="Category" margin="dense" select value={category} onChange={handleChange}>
                        <MenuItem value="Daily">Daily</MenuItem> 
                        <MenuItem value="Business">Business</MenuItem> 
                        <MenuItem value="Travel">Travel</MenuItem> 
                        <MenuItem value="Exam">Exam</MenuItem> 
                    </TextField> 
                    
                    <TextField size="small" label="Comments" margin="dense" multiline minRows={3} />
    
                    <Button variant="contained" color="success">Finish Editing</Button>
                        
                </Stack>
                    
            </form>
          )
}
 
export default EditEntry;