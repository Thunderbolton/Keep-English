import { Card, CardActions, CardContent, CardHeader, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete } from '@material-ui/icons';
import axios from 'axios';
import { useState } from 'react';


const EntryCard = ({entries} : {entries:any}) => {

    // const [cardEntries, setCardEntries] = useState()


    const deleteEntry = async (_id: number) => {
        await axios.delete(`http://localhost:5000/api/entries/${_id}`)
  
        // const filteredEntries = entries.filter((entry: any) => entry._id !== _id);
        // setCardEntries(filteredEntries)
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
                        <IconButton onClick={() => deleteEntry(entries._id)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </CardActions>  
            </Card>
        </div>

    );

}

export default EntryCard