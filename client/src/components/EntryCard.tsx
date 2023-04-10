import EditEntry from './EditEntry';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, Collapse, Tooltip, Typography } from '@mui/material';
import { Edit, Delete, } from '@material-ui/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { blue, green, grey, orange, red } from '@mui/material/colors';
import axios from 'axios';
import { useContext, useState } from 'react'
import { EntriesContext } from '../context/EntryContext';


const EntryCard = ({entries} : {entries:any}) => {

    const { _id } = entries;
    const { dispatch } = useContext(EntriesContext)
      
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


    const StyledCardActionArea = styled(CardActionArea)(() => 
    `.MuiCardActionArea-focusHighlight {
            background: transparent;
        }`);


    const selectCategoryColor = () => {
            switch(entries.category) {
                case 'Daily':
                  return green[400];
                case 'Business':
                  return blue[400]; 
                case 'Travel':
                  return orange[400];
                case 'Exam':
                  return red[400]; 
                default:
                  return grey[400];
              }
          }
              

    // To show edit contents
    const [editform, setEditForm] = useState(false);
    const onClick = () => {setEditForm(!editform)};

    
    const deleteEntry = async () => {
        const response = await axios.delete(`api/entries/${_id}`)
  
        if(response.data) {
            dispatch({type: 'delete_entry', payload: response.data})
            console.log(response.data)
        }
    };

    return (
        <div>
            <StyledCardActionArea disableRipple> 
                <Card elevation={2} sx={{ maxWidth: 450, minHeight: 350, border: 1, borderColor: '#BFC9CA', borderRadius: 4, '&:hover': {transform: expanded ? 'scale(1)' : 'scale(1.1)', border: 1, borderColor: selectCategoryColor(), borderRadius: 4,  overflow: 'hidden' }, transition: '0.2s' }}>
    
                    <CardHeader
                    avatar={
                        entries.category && <Avatar sx={{ bgcolor: selectCategoryColor()}}>
                        {entries.category.charAt(0)}
                        </Avatar>
                    }
                    title={entries.title}
                    subheader={new Date(entries.createdAt).toLocaleString('en-GB', dateOptions)}
                    action={
                        <ExpandMore
                            expand={expanded}
                            sx={{color: expandedColor ? "primary" : "blue", }}
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
                            { editform ? <EditEntry entries={entries} /> : null }

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
            </StyledCardActionArea>
        </div>
    );
}

export default EntryCard