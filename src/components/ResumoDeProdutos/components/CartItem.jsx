import {
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
  decreseProductQuatity,
  increaseProductQuantity,
  removeProduct,
} from '../../../redux-store/redux-actions/Cart/Slice';
import { useConvertValues } from '../../../utils/ConvertValues';
import { useQuery } from '@tanstack/react-query';
import { getByProdutos } from '../../../service/api';

export const CartItem = ({ item }) => {
  const { convertValues } = useConvertValues();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['produtos', item.id], // Use item.id in the queryKey
    queryFn: () => getByProdutos(item.id),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    onSuccess: (data) => {
      setIsOutOfStock(data?.statusEstoque === 'ESGOTADO');
    },
  });

  const handleIncreaseClick = (productId) => {
    dispatch(increaseProductQuantity(productId));
  };

  const handleDecreaseClick = (productId) => {
    dispatch(decreseProductQuatity(productId));
  };

  const handleRemoveClick = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <Card sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 100, height: 100, flexShrink: 0 }}>
        <Box
          component={'img'}
          src={item?.imagens[0].url}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'scale-down',
            opacity: isOutOfStock ? 0.5 : 1,
          }}
        />
      </Box>
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: isOutOfStock ? 0.5 : 1,
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              gap: 1,
            }}>
            <Box>
              <AiOutlineDelete
                onClick={() => handleRemoveClick(item.id)}
                style={{
                  fontSize: '22px',
                  cursor: 'pointer',
                  color: 'red',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              {isOutOfStock && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFEBEE',
                    borderRadius: '20px',
                    marginTop: 1,
                    maxWidth: 'fit-content',
                  }}>
                  <Typography
                    sx={{
                      color: '#D32F2F',
                      fontWeight: 'bold',
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                    }}>
                    Esgotado
                  </Typography>
                </Box>
              )}
              <Typography sx={{ fontSize: isMobile ? '0.885rem' : '1rem' }}>{item.name}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Typography
              sx={{ fontSize: isMobile ? '0.885rem' : '1rem' }}
              color="text.secondary">
              {convertValues(item.price)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 1,
                border: '1px solid #ccc',
                padding: '0.1rem 0.885rem',
                width: isMobile ? '100px' : '140px',
                backgroundColor: '#fff',
              }}>
              <IconButton
                onClick={() => handleDecreaseClick(item.id)}
                disabled={isOutOfStock}
                sx={{
                  fontSize: '20px',
                  padding: 0,
                  color: '#757575',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}>
                <AiOutlineMinus style={{ fontSize: '20px' }} />
              </IconButton>

              <TextField
                type="number"
                value={item.quantity}
                disabled={isOutOfStock}
                inputProps={{
                  min: 1,
                  step: 1,
                }}
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  textAlign: 'center',
                  width: '50px',
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    padding: 0,
                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                      display: 'none',
                    },
                  },
                  '& fieldset': {
                    border: 'none',
                  },
                }}
              />

              <IconButton
                onClick={() => handleIncreaseClick(item.id)}
                disabled={isOutOfStock}
                sx={{
                  fontSize: '20px',
                  padding: 0,
                  color: '#757575',
                  opacity: isOutOfStock ? 0.5 : 1,
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}>
                <AiOutlinePlus style={{ fontSize: '20px' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
