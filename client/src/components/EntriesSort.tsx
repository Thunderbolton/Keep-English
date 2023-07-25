import { IconButton, Tooltip, FormControl, MenuItem, InputLabel} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


const EntriesSort = ({ onCategoryChange }: { onCategoryChange: Function }) => {

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');


  const sortEntriesToggle = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value as string;
    
    setSelectedCategory(selectedCategory);
    onCategoryChange(selectedCategory); 
  };

  return (
    <>
      <Tooltip title="Sort">
        <IconButton>
          <SortIcon onClick={sortEntriesToggle} fontSize='large' />
        </IconButton>
      </Tooltip>
      {showSortOptions && (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id="select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Exam">Exam</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default EntriesSort;
