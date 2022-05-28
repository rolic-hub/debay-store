
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Categories';
import Product from './components/Product';
import Cart from './components/Cart';
import { CreateFlow } from './utils/superfluid';



const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/category/product/:id" element={<Product />} />
    <Route path="/category/:product" element={<Categories />} />
    <Route path="/category/product/cart" element={<Cart />} />
    <Route path="/product/payment/installations" element={<CreateFlow/>}/>
  </Routes>
);
export default App;
