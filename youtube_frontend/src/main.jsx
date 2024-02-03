import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./reduxtoolkit/store.js";
import { Provider } from "react-redux";
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { Login } from "./componentsCollection.js";


const router=createBrowserRouter([
  {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/login",
          element:<Login/>
        }
      ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
