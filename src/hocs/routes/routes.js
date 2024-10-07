import { Route, Routes } from 'react-router-dom';
import Home from '../../containers/pages/Home';
import Error404 from '../../containers/errors/Error404';
import Marcas from '../../containers/pages/dashboard/Marcas/Marcas';
import MarcaDetalle from '../../containers/pages/dashboard/Marcas/MarcaDetalle';
import Productos from '../../containers/pages/dashboard/Productos/Productos';
import Categorias from '../../containers/pages/dashboard/Categorias/Categorias';
import Subcategorias from '../../containers/pages/dashboard/Subcategorias/Subcategorias';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/marcas" element={<Marcas />} />
      <Route path="/marcas/:id" element={<MarcaDetalle />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/subcategorias" element={<Subcategorias />} />
    </Routes>
  );
}

export default AppRoutes;