import { Container, Grid2, Typography } from '@mui/material';
import { CartItem } from './components/CartItem';
import { OrderSummary } from './components/OrderSummary';
import { useSelector } from 'react-redux';
import { selectProductsTotalPrice } from '../../redux-store/redux-actions/Cart/cart.Selectors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { payment } from '../../service/api';

export const ResumoDePedidos = () => {
  const client = useQueryClient();
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const totalPrice = useSelector(selectProductsTotalPrice);

  const { mutate: paymentProdutoMutation, isPending: isPaymentPending } = useMutation({
    mutationFn: payment,
    onSuccess: (data) => {
      client.invalidateQueries(['carrinhos']);
      const paymentUrl = data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error('Erro: URL de pagamento não encontrada');
      }
    },
    onError: () => {
      showAlert('Erro ao Paga produto.', 'error');
    },
  });

  const handleAddProduto = () => {
    const userIdLocalStorage = localStorage.getItem('@Auth:user');

    const userData = JSON.parse(userIdLocalStorage);
    const userId = userData.id;

    if (!userId) {
      console.error('Erro: userId não encontrado no objeto parseado');
      return;
    }

    const productsData = products.map((item) => ({
      userId: userId,
      productId: item.id,
      quantity: item.quantity,
    }));

    paymentProdutoMutation({ userId, products: productsData });
  };

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
          <OrderSummary
            total={totalPrice}
            handleAddProduto={handleAddProduto}
            isPending={isPaymentPending}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};
