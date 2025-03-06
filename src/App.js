import { ToastContainer } from 'react-toastify';
import './App.css';
import SiteRoutes from './Components/SiteRoutes';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
        <SiteRoutes />
      <ToastContainer/>
    </div>
  );
}

export default App;
