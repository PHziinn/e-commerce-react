import { SignUp } from '../page/public/cadastrar';
import { DetailsProducts } from '../page/public/detailsProduct';
import { Home } from '../page/public/home';
import { Login } from '../page/public/login';
import { Unauthorized } from '../page/public/unauthorized';

export const AdminRoutesPath = {};

export const PrivateRoutesPath = {};

export const RoutesPath = {
  '/': Home,
  '/produto': DetailsProducts,
  '/login': Login,
  '/cadastrar': SignUp,
  '/unauthorized': Unauthorized,
};
