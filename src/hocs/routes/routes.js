import { Route, Routes } from "react-router-dom";
import Home from "../../containers/pages/Home";
import Error404 from "../../containers/errors/Error404";
import Marcas from "../../containers/pages/dashboard/Marcas/Marcas";
import MarcaDetalle from "../../containers/pages/dashboard/Marcas/MarcaDetalle";
import Productos from "../../containers/pages/dashboard/Productos/Productos";
import ProductoDetalle from "../../containers/pages/dashboard/Productos/ProductoDetalle";
import Categorias from "../../containers/pages/dashboard/Categorias/Categorias";
import CategoriasDetalle from "../../containers/pages/dashboard/Categorias/CategoriasDetalle";
import Subcategorias from "../../containers/pages/dashboard/Subcategorias/Subcategorias";
import SubcategoriasDetalle from "../../containers/pages/dashboard/Subcategorias/SubcategoriasDetalle";
import Register from "../../containers/pages/dashboard/Users/Register";
import Login from "../../containers/pages/dashboard/Users/Login";
import RecoverPassword from "../../containers/pages/dashboard/Users/RecoverPassword";
import EditProfile from "../../containers/pages/dashboard/Users/EditProfile";
import Products from "../../containers/pages/Products";
import ProductDetail from "../../containers/pages/ProductDetail";
import { Cart } from "../../containers/Cart";
import Estadisticas from "../../containers/pages/dashboard/Estadisticas/Estadisticas";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      <Route path="/Carrito" element={<Cart />} />
      <Route path="/admin/estadisticas" element={<Estadisticas />} />
      <Route path="/admin/marcas" element={<Marcas />} />
      <Route path="/admin/marcas/:id" element={<MarcaDetalle />} />
      <Route path="/admin/productos" element={<Productos />} />
      <Route path="/admin/productos/:id" element={<ProductoDetalle />} />
      <Route path="/admin/categorias" element={<Categorias />} />
      <Route path="/admin/categoria/:id" element={<CategoriasDetalle />} />
      <Route path="/admin/subcategorias" element={<Subcategorias />} />
      <Route
        path="/admin/subcategoria/:id"
        element={<SubcategoriasDetalle />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recoverpassword" element={<RecoverPassword />} />
      <Route path="/edit-profile/:id" element={<EditProfile />} />
    </Routes>
  );
};

export default AppRoutes;
