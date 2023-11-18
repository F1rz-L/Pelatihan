import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/appNavbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import PrivatePage from './components/PrivatePage';

const router = createHashRouter([
  {
    path:'/',
    element:<PrivatePage>
      <Dashboard/>  
    </PrivatePage>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {

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
