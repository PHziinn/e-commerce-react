import { Container, Grid2, Typography } from '@mui/material';
import { CartItem } from './components/CartItem';
import { OrderSummary } from './components/OrderSummary';
import { useSelector } from 'react-redux';
import { selectProductsTotalPrice } from '../../redux-store/redux-actions/Cart/cart.Selectors';

export const ResumoDePedidos = () => {
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const totalPrice = useSelector(selectProductsTotalPrice);

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4 }}>
        Resumo do Pedido
      </Typography>
      <Grid2
        container
        spacing={4}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          {products.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <OrderSummary total={totalPrice} />
        </Grid2>
      </Grid2>
    </Container>
  );
};
