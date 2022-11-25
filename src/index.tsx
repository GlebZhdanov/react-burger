import React from "react";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from "./components/app/app";
import {BrowserRouter} from "react-router-dom";
import './index.css'

const container = document.getElementById("root");

// @ts-ignore
const root = createRoot(container);
root.render(
  <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
  </BrowserRouter>,
);


