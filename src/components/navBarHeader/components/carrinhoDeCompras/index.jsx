import { Box, Button, Divider, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export const CarrinhdoDeCompras = ({ cartOpen }) => {
  const cartItems = [
    {
      id: 1,
      name: 'Cabo USB-C em nylon 1,5 m EUAC 15NB Branco',
      price: 50,
      image: '../../../public/produtos/3.png',
    },
    {
      id: 2,
      name: 'Suporte de Mesa para Celular Ajustável Articulado Tablet Smartphone (Preto)',
      price: 75,
      image: '../../../public/produtos/4.png',
    },
    {
      id: 3,
      name: 'Película 5D 9D Ceramica Compatível com Xiaomi Poco X6 Pro',
      price: 75,
      image: '../../../public/produtos/5.png',
    },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {cartOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '60px',
            right: 0,
            width: 350,
            maxHeight: 400,
            background: 'white',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 10,
            overflow: 'hidden',
          }}>
          <Box
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              padding: 2,
            }}>
            <List>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                    <ListItemAvatar>
                      <Box
                        component={'img'}
                        src={item.image}
                        alt={item.name}
                        sx={{
                          borderRadius: 2,
                          width: 80,
                          height: 60,
                          objectFit: 'contain',
                        }}
                      />
                    </ListItemAvatar>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                      }}>
                      <Typography sx={{ fontSize: '14px' }}>{item.name}</Typography>
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
                            style={{
                              fontSize: '20px',
                              cursor: 'pointer',
                            }}
                          />
                          <Typography sx={{ fontSize: '14px' }}>1</Typography>
                          <AiOutlinePlus
                            style={{
                              fontSize: '20px',
                              cursor: 'pointer',
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}>
                          {`R$ ${item.price.toFixed(2)}`}
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
            <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 'bold' }}>
              Total: R$ {totalPrice.toFixed(2)}
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
                  backgroundColor: '#D3D3D3',
                  color: 'black',
                  boxShadow: 'none',
                },
              }}
              onClick={() => alert('Checkout iniciado!')}>
              Finalizar Compra
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
