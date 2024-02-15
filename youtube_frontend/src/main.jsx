import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./reduxtoolkit/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, FileUpload } from "./componentsCollection.js";
import { ParticularVideo } from "./components/Video/HandleParticularVideo.jsx";
import { UserHistory } from "./components/utils/UserHistory.jsx";
import { MyChannel } from "./components/utils/MyChannel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "upload",
        element: <FileUpload />,
      },
      {
        path: "getParticularVideo/:id",
        element: <ParticularVideo />,
      },
      {
        path: "/history",
        element: <UserHistory />,
      },
      {
        path: "/myChannel",
        element: <MyChannel />,
      },
      {
        path: "*",
        element: <p className="flex justify-center">Route Under Development</p>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
