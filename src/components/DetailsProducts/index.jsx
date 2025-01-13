import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  InputLabel,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineAddShoppingCart, MdOutlineClose, MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { addProduct } from '../../redux-store/redux-actions/Cart/Slice';
import { getByProdutos } from '../../service/api';
import { useConvertValues } from '../../utils/ConvertValues';
import { SliderCard } from '../Slide';
import { DescriptionProduct } from './components/DescriptionProduct';

const settings = {
  spaceBetween: 10,
  slidesPerView: 'auto',
  pagination: { clickable: true },
};

export const ProductDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { convertValues } = useConvertValues();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const handleProductClick = (product) => {
    const productWithQuantity = { ...product, quantity };
    dispatch(addProduct(productWithQuantity));
  };

  const { data, isLoading } = useQuery({
    queryKey: ['produtos', id],
    queryFn: () => getByProdutos(id),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue >= 1 && newValue <= data?.product?.stock) {
      setQuantity(newValue);
    } else if (newValue < 1) {
      setQuantity(1);
    } else {
      setQuantity(data?.product?.stock);
    }
  };

  const handleDecreaseClick = () => {
    const updatedQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(updatedQuantity);
  };

  const handleIncreaseClick = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 1,
          wx: 'auto',
        }}>
        <Box>
          <Grid2
            container
            spacing={4}>
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width={isMobile ? '100%' : 500}
                  height={isMobile ? 350 : 440}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: '#e0e0e0',
                  }}
                />
              ) : (
                <>
                  <SliderCard
                    settings={settings}
                    style={{ width: '100%', height: 'auto' }}>
                    {data?.product?.imagens.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Box
                          component="img"
                          src={image.url}
                          alt={data?.product?.name}
                          sx={{
                            width: '100%',
                            maxHeight: isMobile ? '350px' : '500px',
                            objectFit: 'scale-down',
                            marginBottom: 3,
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </SliderCard>
                </>
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                {data?.product?.statusEstoque === 'ESGOTADO' && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                    }}>
                    <MdOutlineClose
                      style={{
                        color: 'white',
                        fontSize: 30,
                        backgroundColor: 'red',
                        padding: '5px',
                        borderRadius: '50%',
                        marginBottom: 0.1,
                      }}
                    />
                    <Typography
                      textTransform="uppercase"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: 'red',
                        padding: '0px 10px',
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 0, 0, 0.11)',
                        marginLeft: 1,
                      }}>
                      Esgotado
                    </Typography>
                  </Box>
                )}
                <Typography
                  variant="h6"
                  fontWeight="bold">
                  {data?.product?.name}
                </Typography>
                <Box
                  sx={{
                    marginTop: 2,
                  }}>
                  <Typography
                    sx={{ fontSize: 16, textDecoration: 'line-through' }}
                    color="grey">
                    {convertValues(data?.originalPrice)}
                  </Typography>
                  <Typography sx={{ fontSize: '40px', fontWeight: '800' }}>
                    {convertValues(data?.product?.price)}
                  </Typography>
                  <Typography
                    component={'div'}
                    sx={{ fontSize: '15px', mb: '30px' }}>
                    À vista no PIX com até
                    <Chip
                      label={`${data?.product?.discount}% OFF`}
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

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 1,
                      border: '1px solid #ccc',
                      padding: '0.2rem 1rem',
                      width: '140px',
                      backgroundColor: '#fff',
                    }}>
                    <IconButton
                      disabled={data?.product?.statusEstoque === 'ESGOTADO'}
                      onClick={() => handleDecreaseClick(data?.product?.id)}
                      sx={{
                        fontSize: '20px',
                        padding: 0,
                        color: '#757575',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}>
                      <AiOutlineMinus />
                    </IconButton>

                    <TextField
                      type="number"
                      value={quantity}
                      disabled={data?.product?.statusEstoque === 'ESGOTADO'}
                      onChange={(e) => handleQuantityChange(e)}
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
                      disabled={data?.product?.statusEstoque === 'ESGOTADO'}
                      onClick={() => handleIncreaseClick(data?.product?.id)}
                      sx={{
                        fontSize: '20px',
                        padding: 0,
                        color: '#757575',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}>
                      <AiOutlinePlus />
                    </IconButton>
                  </Box>
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
                disabled={data?.product?.statusEstoque === 'ESGOTADO'}
                onClick={() => {
                  navigate(`/resumo-do-pedidos`);
                  handleProductClick(data?.product);
                }}
                sx={{
                  boxshadow: 'none',
                  color: '#fff',
                  background: 'black',
                  fontWeight: 'bold',
                  height: '50px',
                  width: '100%',
                  mb: 3,
                  transition: 'background-color 0.3s',
                  '&:hover': { backgroundColor: '#282828', color: '#fff', boxShadow: 'none' },
                  '&:active': {
                    backgroundColor: '#282828',
                    color: '#fff',
                    boxShadow: 'none',
                  },
                }}>
                <MdOutlineShoppingCart style={{ fontSize: '1.4rem', marginRight: 7 }} />
                Comprar
              </Button>
              <Button
                variant="contained"
                disabled={data?.product?.statusEstoque === 'ESGOTADO'}
                onClick={() => handleProductClick(data?.product)}
                sx={{
                  boxShadow: 'none',
                  color: 'black',
                  background: '#bcbcbc',
                  width: '100%',
                  height: '40px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  '&:hover': { backgroundColor: '#a9a9a9', color: 'black', boxShadow: 'none' },
                  '&:active': {
                    backgroundColor: '#a9a9a9',
                    color: 'black',
                    boxShadow: 'none',
                  },
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
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <DescriptionProduct product={data?.product} />
    </>
  );
};
