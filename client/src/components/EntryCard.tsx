import { Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete, ExpandMore } from '@material-ui/icons';


const EntryCard = ({entries} : {entries:any}) => {

    return (
        <div>
            <Card elevation={2} sx={{ maxWidth: 450, minHeight: 350 }}>
                <CardHeader 
                title={entries.text} 
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
                </CardContent>
                <CardActions>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => console.log('delete', entries.text)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </CardActions>  
            </Card>
        </div>

    );

}

export default EntryCard