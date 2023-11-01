/* eslint-disable */
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TagManager from "react-gtm-module";
import smoothscroll from "smoothscroll-polyfill";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { authProvider } from "./config/AuthProvider";
import { AzureWrapper } from "./context-providers/AzureWrapper";
import { tagManagerConfig } from "./utils/TagManagerHelper";

import store from "./reducers/Store";

import "./styles/index.scss";

TagManager.initialize(tagManagerConfig);
smoothscroll.polyfill();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <AzureWrapper provider={authProvider}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AzureWrapper>
    </Provider>
  </StrictMode>,
);
