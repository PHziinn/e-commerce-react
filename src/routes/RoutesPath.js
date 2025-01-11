import { AdminDashBoard } from '../page/admin/dashboard';
import { AdminGerenciadorDeProdutos } from '../page/admin/gerenciarProdutos';
import { AdminSettings } from '../page/admin/settings';
import { AdminUsuarios } from '../page/admin/usuarios';
import { Profile } from '../page/private/profile';
import { SignUp } from '../page/public/cadastrar';
import { DetailsProducts } from '../page/public/detailsProduct';
import { Home } from '../page/public/home';
import { Login } from '../page/public/login';
import { MaintenancePage } from '../page/public/maintenance';
import { NotFound } from '../page/public/notFound';
import { PaginaRestritaMobiles } from '../page/public/PaginaRestritaMobiles';
import { FalhaPagamento } from '../page/public/FalhaPagamento';
import { PagamentoConcluido } from '../page/public/PagamentoConcluido';
import { SearchProducts } from '../page/public/searchProduto';
import { Unauthorized } from '../page/public/unauthorized';

export const AdminRoutesPath = {
  '/admin/dashboard': AdminDashBoard,
  '/admin/usuarios': AdminUsuarios,
  '/admin/produtos': AdminGerenciadorDeProdutos,
  '/admin/settings': AdminSettings,
};

export const MaintenancePath = {
  '/*': MaintenancePage,
  '/login': Login,
};

export const PrivateRoutesPath = {
  '/perfil': Profile,
};

export const RoutesPath = {
  '/': Home,
  '/produto/:id': DetailsProducts,
  '/produtos/search/produto': SearchProducts,
  '/login': Login,
  '/cadastrar': SignUp,
  '/unauthorized': Unauthorized,
  '/restricted': PaginaRestritaMobiles,
  '/pagamentoConcluido': PagamentoConcluido,
  '/falhaPagamento': FalhaPagamento,
  '/*': NotFound,
};
