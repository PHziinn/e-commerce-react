import { SignUp } from '../page/public/cadastrar';
import { Home } from '../page/public/Home';
import { Unauthorized } from '../page/public/unauthorized';

export const AdminRoutesPath = {};

export const PrivateRoutesPath = {};

export const RoutesPath = {
  '/': Home,
  '/cadastrar': SignUp,
  '/unauthorized': Unauthorized,
};
