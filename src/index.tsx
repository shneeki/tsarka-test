import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useAppApolloClient } from "./Login/Apollo/ApolloClient";

// const client = new ApolloClient({
//   uri: "https://tsarka-frontend-test.herokuapp.com/frontend/task/graphql",
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
