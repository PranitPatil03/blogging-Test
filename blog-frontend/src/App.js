import "./App.css";
import UserAuthFormPage from "./features/auth/components/UserAuthFormPage.js";
import Navbar from "./features/navbar/Navbar.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children: [
      {
        path: "signup",
        element: <UserAuthFormPage type="signup"></UserAuthFormPage>,
      },
      {
        path: "sign-in",
        element: <UserAuthFormPage type="sign-in"></UserAuthFormPage>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
