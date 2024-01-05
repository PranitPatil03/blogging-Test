import { useEffect, useState } from "react";
import "./App.css";
import UserAuthFormPage from "./features/auth/components/UserAuthFormPage.js";
import Navbar from "./features/navbar/Navbar.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setUserAuth } from "./features/auth/userSlice.js";
import { LookInSession } from "./common/Session.js";
import { useDispatch, useSelector } from "react-redux";

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

  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user);

  useEffect(() => {
    const userInSession = LookInSession("user");

    userInSession
      ? dispatch(setUserAuth(JSON.parse(userInSession)))
      : dispatch(setUserAuth({ accessToken: null }));
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
