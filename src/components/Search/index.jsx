import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F8F8FF',
  marginRight: theme.spacing(2),
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.2)',
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
      width: '43ch',
    },
  },
}));

export const SearchResult = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setSearchTerm(nameParam);
    }
  }, [location.search]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const queryParams = new URLSearchParams(location.search);

      if (searchTerm.trim() !== '') {
        queryParams.set('name', searchTerm.trim());
      } else {
        queryParams.delete('name');
      }

      navigate(`/produtos/search/produto?${queryParams.toString()}`, {
        replace: true,
      });
    }
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 20),
    []
  );

  const handleChange = (e) => {
    const { value } = e.target;
    debouncedSetSearchTerm(value);
  };

  return (
    <Box
      component={'form'}
      autoComplete="off">
      <Search sx={{ display: 'flex' }}>
        <SearchIconWrapper>
          <IoIosSearch style={{ fontSize: '1.6rem' }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Pesquisar produtos…"
          inputProps={{
            'aria-label': 'search',
          }}
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
      </Search>
    </Box>
  );
};
