import { SignUp } from '../page/public/cadastrar';
import { DetailsProducts } from '../page/public/detailsProduct';
import { Home } from '../page/public/home';
import { Login } from '../page/public/login';
import { NotFound } from '../page/public/notFound';
import { PaymentFailed } from '../page/public/paymentFailed';
import { PaymentSuccess } from '../page/public/paymentSuccess';
import { SearchProducts } from '../page/public/searchProduto';
import { Unauthorized } from '../page/public/unauthorized';

export const AdminRoutesPath = {};

export const PrivateRoutesPath = {};

export const RoutesPath = {
  '/': Home,
  '/produto': DetailsProducts,
  '/produtos/search/produto': SearchProducts,
  '/login': Login,
  '/cadastrar': SignUp,
  '/unauthorized': Unauthorized,
  '/paymentSuccess': PaymentSuccess,
  '/paymentFailed': PaymentFailed,
  '/*': NotFound,
};
