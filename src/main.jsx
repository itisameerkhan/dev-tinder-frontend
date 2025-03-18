import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error/Error.jsx";
import Body from "./components/Body/Body.jsx";
import Login from "./components/Login/Login.jsx";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";
import Profile from "./components/Profile/Profile.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
