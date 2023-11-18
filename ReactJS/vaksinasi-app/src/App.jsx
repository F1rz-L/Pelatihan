import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/appNavbar';
import Dashboard from './pages/Dashboard';
import PrivatePage from './components/PrivatePage';
import Login from './pages/Login';
import Kasir from './pages/Kasir';

const router = createHashRouter([
  {
    path:'/',
    element:<PrivatePage>
      <Dashboard/>  
    </PrivatePage>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/kasir',
    element: <Kasir/>
  }
]);

function App() {
  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App;
