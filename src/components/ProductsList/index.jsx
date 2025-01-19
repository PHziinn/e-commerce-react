import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Pagination,
  Slider,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct } from '../../redux-store/redux-actions/Cart/Slice.js';
import { getSearchFilters } from '../../service/api';
import { CardProdutoGrid } from './cardProdutoGrid/index.jsx';

export const ProductsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [tempPriceRange, setTempPriceRange] = useState([
    priceRange.min || 10,
    priceRange.max || 50000,
  ]);

  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);

  const handleProductClick = (product) => {
    dispatch(addProduct(product));
  };

  const { data, isLoading } = useQuery({
    queryKey: ['/produtos/search/produto', name, category, priceRange.min, priceRange.max, page],
    queryFn: () => getSearchFilters(name, category, priceRange.min, priceRange.max, page),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    setName(nameParam || '');

    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam.split(','));
    }
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [location.search]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;

    setCategory((prevCategory) => {
      const updatedCategory = checked
        ? [...prevCategory, value]
        : prevCategory.filter((cat) => cat !== value);

      updateUrlWithCategory(updatedCategory);

      return updatedCategory;
    });
  };

  const updateUrlWithCategory = (category) => {
    const queryParams = new URLSearchParams(location.search);
    if (category.length > 0) {
      queryParams.set('category', category.join(','));
    } else {
      queryParams.delete('category');
    }
    navigate(`?${queryParams.toString()}`);
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setPriceRange({ min: tempPriceRange[0], max: tempPriceRange[1] });

    setPage(1);
    const queryParams = new URLSearchParams(location.search);

    if (tempPriceRange[10]) {
      queryParams.set('minPrice', tempPriceRange[10]);
    } else {
      queryParams.delete('minPrice');
    }

    if (tempPriceRange[50000]) {
      queryParams.set('maxPrice', tempPriceRange[50000]);
    } else {
      queryParams.delete('maxPrice');
    }

    if (name) {
      queryParams.set('name', name);
    } else {
      queryParams.delete('name');
    }

    if (category.length > 0) {
      queryParams.set('category', category.join(','));
    } else {
      queryParams.delete('category');
    }
    queryParams.set('page', '1');
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={3}
      sx={{ mt: 20 }}>
      <Box sx={{ width: { xs: '100%', md: '250px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            gutterBottom>
            Filtros
          </Typography>
          <Typography>{`${data?.totalProducts || 0} ${data?.totalProducts === 1 ? 'Resultado' : 'Resultados'}`}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}>
            Categoria
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                value="MAIS_VENDIDOS"
                checked={category.includes('MAIS_VENDIDOS')}
                onChange={handleCategoryChange}
              />
            }
            label="MAIS VENDIDOS"
            value="MAIS_VENDIDOS"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="RECOMENDADOS"
                checked={category.includes('RECOMENDADOS')}
                onChange={handleCategoryChange}
              />
            }
            label="RECOMENDADOS"
            value="RECOMENDADOS"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="MAIS_PROCURADOS"
                checked={category.includes('MAIS_PROCURADOS')}
                onChange={handleCategoryChange}
              />
            }
            label="MAIS PROCURADOS"
            value="MAIS_PROCURADOS"
          />
        </Box>

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}>
            Faixa de preço
          </Typography>

          <Box
            display="flex"
            alignContent={'center'}
            justifyContent={'center'}
            mt={5}>
            <Slider
              value={tempPriceRange}
              onChange={(e, newValue) => setTempPriceRange(newValue)}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `R$ ${value}`}
              min={10}
              max={50000}
              step={10}
              sx={{ width: '80%' }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000' }}
          fullWidth
          onClick={applyFilters}>
          Aplicar filtros
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        minHeight="600px">
        <CardProdutoGrid
          isLoading={isLoading}
          data={data}
          navigate={navigate}
          handleProductClick={handleProductClick}
        />

        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end">
          {data?.totalPages > 1 && (
            <Pagination
              count={data?.totalPages || 1}
              page={page}
              onChange={(e, value) => {
                setPage(value);
                navigate(`?page=${value}`);
              }}
              variant="outlined"
              color="primary"
              showFirstButton
              showLastButton
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
