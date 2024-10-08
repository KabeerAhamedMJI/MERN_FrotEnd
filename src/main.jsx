import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from './routes/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import "./index.css";
import Signup from "./routes/signup";
import Admin from "./routes/admin"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "admin",
    element: <Admin />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
