import { Box, Button, Divider, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsTotalPrice } from '../../../../redux-store/redux-actions/Cart/cart.Selectors';
import {
  decreseProductQuatity,
  increaseProductQuantity,
  removeProduct,
} from '../../../../redux-store/redux-actions/Cart/Slice';
import { useConvertValues } from '../../../../utils/ConvertValues';
import { useNavigate } from 'react-router-dom';

export const CarrinhoDeCompras = ({ cartOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
  const { convertValues } = useConvertValues();

  const totalPrice = useSelector(selectProductsTotalPrice);

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
    <>
      {cartOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '60px',
            right: 0,
            width: 370,
            maxHeight: 460,
            background: 'white',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 999,
            overflow: 'hidden',
          }}>
          <Box
            sx={{
              maxHeight: 350,
              overflowY: 'auto',
              padding: 1,
            }}>
            <List>
              {products.map((item) => (
                <Box key={item.id}>
                  <ListItem sx={{ paddingLeft: 0, paddingRight: 1 }}>
                    <ListItemAvatar>
                      <Box
                        component={'img'}
                        src={item.imagens[0].url}
                        alt={item.name}
                        sx={{
                          borderRadius: 2,
                          width: 90,
                          height: 70,
                          objectFit: 'scale-down',
                        }}
                      />
                    </ListItemAvatar>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                      }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          gap: 1,
                        }}>
                        <AiOutlineDelete
                          onClick={() => handleRemoveClick(item.id)}
                          style={{
                            fontSize: '22px',
                            cursor: 'pointer',
                            color: 'red',
                          }}
                        />
                        <Typography sx={{ fontSize: '14px', mt: 1, mb: 1, ml: 1 }}>
                          {item.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                          }}>
                          <AiOutlineMinus
                            onClick={() => handleDecreaseClick(item.id)}
                            style={{
                              fontSize: '22px',
                              cursor: 'pointer',
                            }}
                          />
                          <Typography sx={{ fontSize: '15px' }}>{item.quantity}</Typography>
                          <AiOutlinePlus
                            onClick={() => handleIncreaseClick(item.id)}
                            style={{
                              fontSize: '22px',
                              cursor: 'pointer',
                            }}
                          />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                          }}>
                          {convertValues(item.price)}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              padding: 2,
              borderTop: '1px solid #e0e0e0',
              background: '#f9f9f9',
            }}>
            <Typography sx={{ mb: 1, fontSize: '18px', fontWeight: 'bold' }}>
              Total: {convertValues(totalPrice)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                boxShadow: 'none',
                background: '#000',
                borderRadius: 2,
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#282828',
                  color: 'white',
                  boxShadow: 'none',
                },
              }}
              onClick={() => {
                navigate(`/resumo-do-pedidos`);
              }}>
              Finalizar Compra
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
