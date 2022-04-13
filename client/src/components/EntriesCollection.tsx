import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
// import { MoreVertIcon } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const EntriesCollection = ({entries} : {entries:any}) => {

    return (
      <div>
          <h1>Entries collection</h1>

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
      </div>
    );
  }
  
  export default EntriesCollection