import HomePage from "./routes/homePage/HomePage.jsx";
import Layout, { RequireAuth } from "./routes/layout/Layout.jsx";
import ListPage from "./routes/listPage/ListPage.jsx";
import ProfilePage from "./routes/profilePage/ProfilePage.jsx";
import Register from "./routes/register/Register.jsx";
import Login from "./routes/login/Login.jsx";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage.jsx";
import NewPostPage from "./routes/newPostPage/NewPostPage.jsx";
import http from "./http/index.js";
import Contact from "./routes/contact/Contact.jsx";
import About from "./routes/about/About.jsx";
import Agents from "./routes/agents/Agents.jsx";
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
          loader: async ({ request, params }) => {
            const res = await http("/posts/" + params.id);
            return res.data;
          },
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/agents",
          element: <Agents />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: async () => {
            const postPromise = await http.get("/user/profilePosts");
            const chatPromise = http.get("/chats");
            return defer({
              postResponse: postPromise,
              chatResponse: chatPromise,
            });
          },
        },
        {
          path: "/updateProfile",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/newPostPage",
          element: <NewPostPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
