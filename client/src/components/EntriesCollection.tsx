import { Card, CardContent, CardHeader, Container, Grid, IconButton } from '@mui/material';
// import { MoreVertIcon } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>
          <Container>
            <Grid container justifyContent="space-evenly" alignItems="center" gap={4}>

              {entries.map((entry:any) => (

              <Card variant='outlined' sx={{ maxWidth: 450, minHeight: 350 }}>
                <CardHeader 
                  title={entry.text} 
                  subheader={entry.createdAt}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <li>{entry._id}</li>
                </CardContent>
              </Card>

              ))}

            </Grid>

          </Container>
          
          
      </div>
    );
  }
  
  export default EntriesCollection