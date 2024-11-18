import { IoIosSearch } from 'react-icons/io';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F8F8FF',
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
    height: '40px',
    top: '1px',
    color: '#4B5563',
    borderRadius: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: '#F8F8FF',
    color: '#4B5563',
    width: '100%',
    height: '35px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: '5px solid',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SearchResult = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/produtos/search/produto?name=${encodeURIComponent(searchTerm.trim())}`, {
        replace: true,
      });
    }
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 10),
    []
  );

  const handleChange = (e) => {
    const { value } = e.target;
    debouncedSetSearchTerm(value);
  };

  return (
    <Search sx={{ display: 'flex' }}>
      <SearchIconWrapper>
        <IoIosSearch style={{ fontSize: '1.6rem' }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Pesquisar produtos…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleSearch}
      />
    </Search>
  );
};
