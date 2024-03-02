import { Route, Routes } from 'react-router-dom';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import Register from './feathers/users/Register.tsx';
import Login from './feathers/users/Login.tsx';
import Layout from './components/UI/Layout/Layout.tsx';
import ProductsPage from './feathers/products/ProductsPage.tsx';
import ProductPage from "./feathers/products/ProductPage.tsx";


const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProductsPage/>}/>
          <Route path='/products/:category' element={<ProductsPage/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
      </Layout>
    </>
  )
};

export default App
