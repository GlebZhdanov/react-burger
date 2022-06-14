import React from "react";
import { configureStore } from './redux/store';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from "./components/app/app";

const store = configureStore();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
);
