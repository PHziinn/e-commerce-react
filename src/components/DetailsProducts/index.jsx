import { useState } from 'react';
import {
  MdOutlineAddShoppingCart,
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import ImageOne from '../../../public/produtos/1.png';

export const ProductDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [quantity, setQuantity] = useState('1');

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 1,
        wx: 'auto',
      }}>
      <Box>
        <Grid
          container
          spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              component="img"
              src={ImageOne}
              alt="Product Image"
              sx={{
                width: '100%',
                maxHeight: isMobile ? '350px' : '500px',
                aspectRatio: '2/3',
                objectFit: 'cover',
                overflow: 'hidden',
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MdOutlineClose
                  style={{
                    color: 'red',
                    fontSize: 25,
                    marginBottom: 0.1,
                  }}
                />
                <Typography
                  textTransform="uppercase"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 20,
                    color: 'red',
                  }}>
                  Esgotado
                </Typography>
              </Box>
              <Typography
                variant="h6"
                fontWeight="bold">
                Fone De Ouvido Bluetooth Sem Fio tws Compatível com Todos Celulares Microfone
                embutido
              </Typography>

              <Box
                sx={{
                  marginTop: 2,
                }}>
                <Typography
                  sx={{ fontSize: 16, textDecoration: 'line-through' }}
                  color="grey">
                  R$ 60,00
                </Typography>
                <Typography
                  fontWeight="800"
                  fontSize="40px">
                  R$ 40,00
                </Typography>
                <Typography
                  fontSize="15px"
                  marginBottom="30px">
                  À vista no PIX com até
                  <Chip
                    label="5% OFF"
                    sx={{
                      backgroundColor: '#1C1C1C',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      marginLeft: 1,
                    }}
                  />
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InputLabel
                  id="quantity-label"
                  sx={{ color: '#828282', fontSize: 18, mr: 1 }}>
                  Quatidades:
                </InputLabel>
                <FormControl sx={{ width: '8rem', color: '#828282' }}>
                  <Select
                    labelId="quantity-label"
                    id="quantity-select"
                    value={quantity}
                    IconComponent={MdOutlineKeyboardArrowDown}
                    onChange={handleChange}
                    sx={{
                      '.MuiSelect-icon': {
                        fontSize: 30,
                        color: '#000000',
                      },
                      '.MuiSelect-select': { color: '#333', fontWeight: 500, padding: 0 },
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#828282',
                      },
                    }}>
                    <MenuItem value="1">1 Unit</MenuItem>
                    <MenuItem value="2">2 Units</MenuItem>
                    <MenuItem value="3">3 Units</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{
                height: '0.009rem',
                backgroundColor: '#ccc',
                my: 4,
              }}
            />
            <Button
              variant="contained"
              sx={{
                boxshadow: 'none',
                background: 'black',
                height: '50px',
                width: '100%',
                mb: 3,
                '&:hover': { backgroundColor: '#a9a9a9', color: 'black' },
              }}>
              <MdOutlineShoppingCart style={{ fontSize: '1.4rem', marginRight: 7 }} />
              Comprar
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{
                color: 'black',
                background: '#dcdde2',
                width: '100%',
                height: '40px',
                '&:hover': { backgroundColor: '#a9a9a9', color: 'black' },
              }}>
              <MdOutlineAddShoppingCart style={{ fontSize: '1.4rem', marginRight: 7 }} />
              Adicionar no carrinho
            </Button>
            <Box
              sx={{
                height: '0.009rem',
                backgroundColor: '#ccc',
                mt: 4,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
