import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Game from "./pages/game";
import Error from "./pages/error";
import Unsubscribe from "./pages/unsubscribe";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "game",
        element: <Game />,
      },
      // {
      //   path: "unsubscribe",
      //   element: <Unsubscribe />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
