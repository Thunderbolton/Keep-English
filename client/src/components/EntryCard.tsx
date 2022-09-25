import { Card, CardActions, CardContent, CardHeader, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete } from '@material-ui/icons';
import axios from 'axios';
import { useState } from 'react';
import { useEntriesContext } from '../context/useEntriesContext';


const EntryCard = ({entries} : {entries:any}) => {

    const { _id } = entries;

    const { dispatch } = useEntriesContext()

    const deleteEntry = async () => {
        const response = await axios.delete(`api/entries/${_id}`)
  
        if (response.data) {
            // console.log(`Success: ${response.data}`)
        
            dispatch({type: 'delete_entry', payload: response.data})
            console.log(response.data)
        }
    }

    return (
        <div>
            <Card elevation={2} sx={{ maxWidth: 450, minHeight: 350 }}>
                <CardHeader 
                title={entries.title} 
                subheader={entries.createdAt}
                action={
                    <Tooltip title="Edit" placement="top">
                        <IconButton aria-label="settings">
                            <Edit />
                        </IconButton>
                    </Tooltip>
                }
                />
                <CardContent>
                    <li>{entries._id}</li>
                    <p>{entries.comments}</p>
                </CardContent>
                <CardActions>
                    <Tooltip title="Delete">
                        <IconButton onClick={deleteEntry}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </CardActions>  
            </Card>
        </div>

    );

}

export default EntryCard