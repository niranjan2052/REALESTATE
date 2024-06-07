import HomePage from "./routes/homePage/HomePage.jsx";
import Layout from "./routes/layout/Layout.jsx";
import ListPage from "./routes/listPage/ListPage.jsx";
import ProfilePage from "./routes/profilePage/ProfilePage.jsx";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
