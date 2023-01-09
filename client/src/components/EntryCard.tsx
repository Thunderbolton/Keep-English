import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Edit, Delete, } from '@material-ui/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { blue, green, grey, orange, red } from '@mui/material/colors';
import axios from 'axios';
import { useState } from 'react';
import { useEntriesContext } from '../context/useEntriesContext';


const EntryCard = ({entries} : {entries:any}, {props} : {props:any}) => {

    const { _id } = entries;
    const { dispatch } = useEntriesContext()
      
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Expand card state
    const [expanded, setExpanded] = useState(false);
    const [expandedColor, setExpandedColor] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        setExpandedColor(!expandedColor);
        setEditForm(false);
    };

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
      }
      
    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })
      (({ theme, expand }) => ({
          transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));
    
    const expandButtonProps = {
        title: expanded ? "Collapse" : "Expand"
    };


    // To show edit contents
    const [editform, setEditForm] = useState(false);
    const onClick = () => {setEditForm(!editform)};

    // Select category state
    const [category, setCategory] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((e.target as HTMLInputElement).value);
      };


    const EditEntry = () => (
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
                    
            </Stack>
                
        </form>
      )
    
    const deleteEntry = async () => {
        const response = await axios.delete(`api/entries/${_id}`)
  
        if (response.data) {
            // console.log(`Success: ${response.data}`)
            dispatch({type: 'delete_entry', payload: response.data})
            console.log(response.data)
        }
    };


    // const updateEntry = async () => {
    //     const response = await axios.put(`api/entries/${_id}`)

    //     if (response.data) {
    //         // console.log(`Success: ${response.data}`)
        
    //         dispatch({type: 'update_entry', payload: response.data._id})
    //         console.log(response.data)
    //     }
    // }

    return (
        <div>
            <Card elevation={2} sx={{ maxWidth: 450, minHeight: 350 }}>
                <CardHeader
                avatar={
                    entries.category && <Avatar sx={{ bgcolor: entries.category === 'Daily' ? green[400] : entries.category === 'Business' ? blue[400] : entries.category === 'Travel' ? orange[400] : entries.category === 'Exam' ? red[400] : grey[400]}}>
                      {entries.category.charAt(0)}
                    </Avatar>
                  }
                title={entries.title}
                subheader={new Date(entries.createdAt).toLocaleString('en-GB', dateOptions)}
                action={
                    <ExpandMore
                        expand={expanded}
                        sx={{color: expandedColor ? "primary" : "blue"}}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <Tooltip {...expandButtonProps} placement="top">
                            <ExpandMoreIcon/>
                        </Tooltip> 
                    </ExpandMore>     
                }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            <span>{entries.comments}</span>
                        </Typography>
                        
                        <Tooltip title="Edit" placement="top">
                            <IconButton onClick={onClick}>
                                <Edit></Edit>
                            </IconButton>
                        </Tooltip>
                        { editform ? <EditEntry /> : null }

                    </CardContent>
                </Collapse>
                <CardContent>
                    <li>{entries._id}</li>
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