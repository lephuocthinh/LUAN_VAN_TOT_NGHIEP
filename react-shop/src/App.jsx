import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";


const App = () => {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Product-List" element={<ProductList />} />

        <Route path="/Product-Detail" element={<Product />} />

        <Route path="/Cart" element={<Cart />} />

        <Route path="/Success" element={<Success />} />

        <Route path="/PaymentCash" element={<Payment />} />

        <Route path="/Search" element={<SearchProducts />} />

        <Route path="/Register" element={<Register />} />

        <Route path="/Login" element={<Login />} />
      </Routes>

  
    </>
  );
};


export default App;
