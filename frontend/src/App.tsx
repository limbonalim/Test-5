import { Route, Routes } from 'react-router-dom';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import Register from './feathers/users/Register.tsx';
import Login from './feathers/users/Login.tsx';


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="*" element={(<NotFound/>)}/>
      </Routes>
    </>
  )
};

export default App
