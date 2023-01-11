import React from "react";

// styles
import "./App.scss";

// components
import { Layout } from "./components/Layout/Layout";

// firebase
import { useAuth } from "./services/hooks/useAuth";
import { useGetData } from "./services/hooks/useGetData";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUsers } from "./services/redux/slices/userSlice";
import { setProducts } from "./services/redux/slices/productsSlice";

const App = React.memo(() => {
  const dispatch = useDispatch();
  // ===data from firebase===
  const { currentUser } = useAuth();
  const usersData = useGetData("users");
  const productsData = useGetData("products");
  //  ===data from firebase===

  const usersFromFirebase = usersData.data;
  const productsFromFirebase = productsData.data;
  const { user } = useSelector((state) => state.user);

  const { users } = useSelector((state) => state.user);

  const { products } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(setUser(currentUser));
  }, [currentUser]);

  React.useEffect(() => {
    dispatch(setUsers(usersFromFirebase));
  }, [usersFromFirebase]);

  React.useEffect(() => {
    dispatch(setProducts(productsFromFirebase));
  }, [productsFromFirebase]);

  // console.log("products ", products);

  return <Layout />;
});

export default App;
