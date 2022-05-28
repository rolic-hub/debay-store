import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApiCode } from "./utils/ApiCode";
import { MoralisProvider } from "react-moralis";
import { Integration } from "./utils/integration";
import { ChakraProvider } from "@chakra-ui/react";
require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MoralisProvider
    serverUrl={process.env.REACT_APP_MORALIS_SERVER}
    appId={process.env.REACT_APP_MORALIS_APPID}
  >
    <ApiCode>
      <Integration>
        <Router>
          <ChakraProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ChakraProvider>
        </Router>
      </Integration>
    </ApiCode>
  </MoralisProvider>
);
