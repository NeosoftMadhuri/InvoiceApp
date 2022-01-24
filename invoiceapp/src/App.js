
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Home from './Component/Dashboard/Home';
import Setting from './Component/Setting/Setting';
import Addinvoice from './Component/Invoice/Addinvoice';
import Product from './Component/Product/Product';
import Invoicelist from './Component/Invoice/Invoicelist';
import Preview from './Component/Invoice/Preview';
import Demo from './Component/Demo';

function App() {
  return (
    < >
    {/* <Demo/> */}
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>}/>
        <Route path="/register" exact element ={<Register/>}/>
        <Route path="/home" exact element ={<Home/>}/>
        <Route path="/addproduct" exact element={<Product/>}/>
        <Route path="/addinvoice" exact element={<Addinvoice/>}/>
        <Route path="/invoicelist" exact element={<Invoicelist/>}/>
        <Route path="/preview" exact element={<Preview/>}/>
        <Route path="/setting" exact element={<Setting/>}/>
        
      </Routes>
   
    </Router>
   
      
    </>
  );
}

export default App;
