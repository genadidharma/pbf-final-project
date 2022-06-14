import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Cart from "./cart/CartList";
import Login from "./auth/Login";
import Register from "./auth/Register";
import {auth} from './database/config'


function App() {
  return (
    <Template>
      <Switch>
        <Route 
        path={["/Login", "/"]} exact>
            <Login />
        </Route>
        <Route path="/Register" exact>
            <Register />
        </Route>
        <Route path="/productlist" exact>
          <ProductList />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
