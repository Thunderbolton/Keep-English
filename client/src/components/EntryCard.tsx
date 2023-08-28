import axios from 'axios';
import { useContext, useState } from 'react'
import EditEntry from './EditEntry';
import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Tooltip, Typography } from '@mui/material';
import { Edit, Delete, } from '@material-ui/icons';
import FolderIcon from '@mui/icons-material/Folder';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import TodayIcon from '@mui/icons-material/Today';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { EntriesContext } from '../context/EntryContext';
import { AuthContext } from "../context/AuthContext";

const EntryCard = ({ entry } : { entry: any }) => {

    const { _id } = entry;
    const { dispatch } = useContext(EntriesContext)
    const { user } = useContext(AuthContext)


    const deleteEntry = async () => {
        const response = await axios.delete(`api/entries/${_id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
  
        if(response.data) {
            dispatch({type: 'delete_entry', payload: response.data})
            console.log(response.data)
        }
    };

      
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
        setEditColor(false)
    };

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
      }
      
    const ExpandMore = styled((props: ExpandMoreProps) => {
        return <IconButton {...props} />;
    })
        (({ expand }) => ({
            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        }),
    );
    
    const expandButtonProps = {
        title: expanded ? "Collapse" : "Expand"
    };
    

    // To show edit contents
    const [editform, setEditForm] = useState(false);

    const [editColor, setEditColor] = useState(false)

    const onClick = () => {
        setEditForm(!editform);
        setEditColor(!editColor);
    };


    // Separate entry card text into paragraphs.
    const paragraphs = entry.comments.split('\n');

    const selectCategoryColor = () => {
            switch(entry.category) {
                case 'Daily':
                  return <Avatar sx={{bgcolor: '#5799d3'}}><TodayIcon /></Avatar>
                case 'Business':
                  return <Avatar sx={{bgcolor: '#933306'}}><FolderIcon /></Avatar>; 
                case 'Travel':
                  return <Avatar sx={{bgcolor: '#f96781'}}><AirplaneTicketIcon /></Avatar>;
                case 'Exam':
                  return <Avatar sx={{bgcolor: '#044766'}}><LibraryBooksIcon /></Avatar>; 
                default:
                  return <FolderIcon />;
              }
          }
    
    return (
        <div>
            <Card elevation={2} sx={{ boxSizing: 'border-box', maxWidth: 450, minHeight: 150, border: 1, borderColor: '#BFC9CA', borderRadius: 4, '&:hover': { boxShadow: `0 2px 4px ${selectCategoryColor()}`, overflow: 'hidden' } }}>
                    <CardHeader
                    avatar={
                        entry.category && <Avatar sx={{ bgcolor: '#933306' }} onClick={handleExpandClick}>
                            {selectCategoryColor()}
                        </Avatar>
                    }
                    title={<b>{entry.title}</b>}
                    subheader={new Date(entry.createdAt).toLocaleString('en-GB', dateOptions)}  
                    action={<ExpandMore
                            expand={expanded}
                            sx={{ color: expandedColor ? "primary" : "#f61d44" }}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <Tooltip {...expandButtonProps} placement="top">
                                <ExpandMoreIcon />
                            </Tooltip> 
                        </ExpandMore> 
                    }  
                    />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {paragraphs.map((paragraph: string, index: number) => (
                                <Typography key={index} paragraph>
                                    {paragraph}
                                </Typography>
                            ))}
                                <Tooltip title="Edit" placement="top">                        
                                    <IconButton onClick={onClick} sx={{color: editColor ?  "#f61d44" : "primary" }}>
                                        <Edit />                                      
                                    </IconButton> 
                                </Tooltip>
                             <Collapse in={editform} timeout="auto" unmountOnExit>  
                                {editform && <EditEntry entries={entry} onClick={onClick}/>}
                            </Collapse>
                        </CardContent>
                    </Collapse>
                    {/* <CardContent>
                        <li>{entries._id}</li>
                    </CardContent> */}
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
