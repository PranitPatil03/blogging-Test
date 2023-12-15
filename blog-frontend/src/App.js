import { useEffect } from "react";
import "./App.css";
import UserAuthFormPage from "./features/auth/components/UserAuthFormPage.js";
import Navbar from "./features/navbar/Navbar.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setUserAuth } from "./features/auth/userSlice.js";
import { LookInSession } from "./common/Session.js";

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

  useEffect(() => {
    const userInSession = LookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null });
  }, []);

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
