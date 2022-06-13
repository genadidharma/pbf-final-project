import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Cart from "./cart/CartList";

function App() {
  return (
    <Template>
      <Switch>
        <Route path="/" exact>
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
