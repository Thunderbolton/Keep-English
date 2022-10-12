import { Card, CardActions, CardContent, CardHeader, Tooltip, Button } from '@mui/material';
import { Edit, Delete, } from '@material-ui/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useEntriesContext } from '../context/useEntriesContext';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';


const EntryCard = ({entries} : {entries:any}) => {

    const { _id } = entries;
    const { dispatch } = useEntriesContext()
    
    // Expand card state
    const [expanded, setExpanded] = useState(false);
    const [expandedColor, setExpandedColor] = useState(true);  

        const handleExpandClick = () => {
            setExpanded(!expanded);
            setExpandedColor(!expandedColor);
        };

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
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
    }
      

    const deleteEntry = async () => {
        const response = await axios.delete(`api/entries/${_id}`)
  
        if (response.data) {
            // console.log(`Success: ${response.data}`)
        
            dispatch({type: 'delete_entry', payload: response.data})
            console.log(response.data)
        }
    }


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
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates nesciunt, placeat, numquam eveniet recusandae quam
                        </Typography>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt eligendi tempora voluptates libero dolorem quidem consequatur nostrum fuga nisi, nulla illo laborum? Odit debitis fuga libero voluptate saepe sed repellat?
                            Quidem iusto beatae ipsam possimus vero ad veritatis doloribus rerum rem iste, molestiae dolorem. Odit, reprehenderit? Laboriosam laudantium sequi qui expedita dolore et nesciunt quia fugit, quidem, ipsa optio neque.
                            Mollitia distinctio quo itaque alias voluptates ea cumque nesciunt eligendi perferendis eveniet dolorum sit, assumenda unde quod tenetur deserunt consequatur dolores porro nobis voluptatum dignissimos ipsam odit! Nemo, ipsa numquam?
                        </Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, eligendi.
                        </Typography>
                        {expanded && <Edit />}
                    </CardContent>
                </Collapse>
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