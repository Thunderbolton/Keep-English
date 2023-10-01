import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import axios from 'axios';
import { EntriesContext } from '../context/EntryContext';
import { AuthContext } from "../context/AuthContext";

const EditEntry = ({ entries, toggleEditForm } : { entries: any, toggleEditForm: () => void }) => {

    const { _id } = entries;
    const { dispatch } = useContext(EntriesContext)
    const { user } = useContext(AuthContext)

    
    // Edit form input states
    const [title, setTitle] = useState(entries.title);
    const [category, setCategory] = useState(entries.category);
    const [comments, setComments] = useState(entries.comments);

  
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        toggleEditForm()
        const response = await axios.put(`https://keep-english-api.onrender.com/api/entries/${_id}`, {title: title, category: category, comments: comments}, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })

        if (response.data) {
          dispatch({type: 'update_entry', payload: response.data})
        }
    };


    return ( 
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField size="small" label="Title" margin="dense" value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)}/>
    
                    <TextField size="small" label="Category" margin="dense" select value={category} onChange={(e) => setCategory((e.target as HTMLInputElement).value)}>
                        <MenuItem value="Daily">Daily</MenuItem> 
                        <MenuItem value="Business">Business</MenuItem> 
                        <MenuItem value="Travel">Travel</MenuItem> 
                        <MenuItem value="Exam">Exam</MenuItem> 
                    </TextField> 
                    
                    <TextField size="small" label="Comments" margin="dense" value={comments} multiline minRows={3} onChange={(e) => setComments((e.target as HTMLInputElement).value)}/>
    
                    <Button variant="contained" color="primary" type="submit">Finish Editing</Button>
                </Stack>
            </form>
          )
}
 
export default EditEntry;