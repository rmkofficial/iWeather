import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/weather", element: <Weather /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
