import './App.css';
import Server from './pages/Server';
import Login from './pages/Login';
import Home from './pages/Home'
import Accessibility from './pages/Accessibility';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Customer1 from './pages/Customer1';
import Customer2 from './pages/Customer2';
import Maps from './pages/Maps';
import Manager from './pages/Manager';
import RecordRestock from './pages/recordRestock'
import ExcessReport from './pages/excessReport';
import RestockReport from './pages/restockReport';
import ComboReport from './pages/bestSellerReport';
import SalesReport from './pages/salesReport';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/server/:username" element={<Server/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/acc" element={<Accessibility/>}/>
            <Route path="/customer1" element={<Customer1/>}/>
            <Route path="/customer2" element={<Customer2/>}/>
            <Route path ="/maps" element = {<Maps/>}/>
            <Route path ="/manager/:username" element = {<Manager/>}/>
            <Route path ="/recordRestock" element = {<RecordRestock/>}/>
            <Route path ="/excessReport" element = {<ExcessReport/>}/>
            <Route path ="/restockReport" element = {<RestockReport/>}/>
            <Route path ="/bestSellersReport" element = {<ComboReport/>}/>
            <Route path ="/salesReport" element = {<SalesReport/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
