import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";

import ToggleColorModeProvider from "./utils/ToggleColorMode";

import App from "./App.jsx";
import store from "./app/store.js";
import "./index.css";
const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>
);
