import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import makeApolloClient from "./config";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const client = makeApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
