/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { checkUserSession } from "./store/user/user.action";
import Authentication from "./routes/authentication/authentication";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element=<Home /> />
          <Route path="/auth" element=<Authentication /> />
          <Route path="/shop/*" element=<Shop /> />
          <Route path="/checkout" element=<Checkout /> />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
  