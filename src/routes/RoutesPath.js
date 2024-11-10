import { Home } from '../page/home';
import { SignUp } from '../page/public/cadastrar';
import { Login } from '../page/public/login';
import { Unauthorized } from '../page/public/unauthorized';

export const AdminRoutesPath = {};

export const PrivateRoutesPath = {};

export const RoutesPath = {
  '/': Home,
  '/login': Login,
  '/cadastrar': SignUp,
  '/unauthorized': Unauthorized,
};
