import React from "react";
import { configureStore } from './redux/store';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from "./components/app/app";
import {BrowserRouter} from "react-router-dom";
import './index.css'

const store = configureStore();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
  </BrowserRouter>,
);

