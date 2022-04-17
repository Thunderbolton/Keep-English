import { Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { Edit, Favorite, Delete, ExpandMore } from '@material-ui/icons';


const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>
          <Container>
            <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>

              {entries.map((entry:any) => (

              <Card elevation={2} sx={{ maxWidth: 450, minHeight: 350 }}>
                <CardHeader 
                  title={entry.text} 
                  subheader={entry.createdAt}
                  action={
                    <Tooltip title="Edit" placement="top">
                      <IconButton aria-label="settings">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    
                  }
                />
                <CardContent>
                  <li>{entry._id}</li>
                </CardContent>
                <CardActions>
                  <Tooltip title="Delete">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </CardActions>  
              </Card>

              ))}

            </Grid>

          </Container>
          
          
      </div>
    );
  }
  
  export default EntriesCollection