import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip, FormControl, MenuItem, InputLabel } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


const EntriesSort = ({ onCategoryChange } : { onCategoryChange: Function }) => {

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const sortEntriesToggle = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value as string;
    
    setSelectedCategory(selectedCategory);
    onCategoryChange(selectedCategory); 
  };


  const formControlStyle = {
    "& label.Mui-focused": {
      color: primaryColor,
    },
    "& .MuiOutlinedInput-root": {
      '&:hover fieldset': {
        borderColor: '#be8469',
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 2, borderColor: '#be8469'
    },
  }

  return (
    <>
      <Tooltip title="Sort">
        <IconButton onClick={sortEntriesToggle}>
          <SortIcon  fontSize='large' color='success' />
        </IconButton>
      </Tooltip>
        {showSortOptions && (
          <FormControl sx={{ m: 1, minWidth: 160, ...formControlStyle }} size='small'>
            <InputLabel 
              id="select-label" 
              sx={{ color: primaryColor }}>Category
            </InputLabel>
            <Select
              color='info'
              label="Category"
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
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
