import { Route, Routes } from 'react-router-dom';
import Home from '../../containers/pages/Home';
import Error404 from '../../containers/errors/Error404';
import Marcas from '../../containers/pages/dashboard/Marcas/Marcas';
import MarcaDetalle from '../../components/marcas/MarcaDetalle';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/marcas" element={<Marcas />} />
      <Route path="/marcas/:id" element={<MarcaDetalle />} />
    </Routes>
  );
}

export default AppRoutes;