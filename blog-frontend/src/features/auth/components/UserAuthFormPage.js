/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import InputBox from "../../../components/InputBox";
import googleIcon from "../../../assets/google.png";
import { Link, Navigate } from "react-router-dom";
import PageAnimation from "../../../common/PageAnimation.js";
import { useSelector, useDispatch } from "react-redux";
import { createUserAsync, loginUserAsync, selectUserAuth } from "../userSlice.js";
import { Toaster, toast } from "react-hot-toast";
import { authWithGoogle } from "../../../common/Firebase.js";

const UserAuthFormPage = ({ type }) => {
  const dispatch = useDispatch();

  const userAuthData = useSelector(selectUserAuth);

  const { accessToken, fullName, profile_img, userName } = userAuthData || {};

  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const serverRoute = type === "sign-in" ? "/sign-in" : "/signup";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(FormElement);

    const formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { fullName, email, password } = formData;

    console.log(formData);

    if (fullName) {
      if (fullName.length < 3) {
        return toast.error("FullName must be at least 3 Letters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter Mail");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Mail is Invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("Password is Invalid");
    }

    dispatch(
      createUserAsync({
        serverRoute: serverRoute,
        formData: formData,
      })
    );
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        console.log(user.accessToken.length);

        const serverRoute = "/google-auth";

        const formData = {
          accessToken: user.accessToken,
        };

        console.log(formData.accessToken.length);

        // dispatch(
        //   loginUserAsync({
        //     serverRoute: serverRoute,
        //     formData: formData,
        //   })
        // );
      })
      .catch((err) => {
        toast.error("Something went wrong , Try Again");
        return console.log(err);
      });
  };

  return accessToken ? (
    <Navigate to="/" />
  ) : (
    <div>
      <PageAnimation key={type}>
        <section className="h-cover flex items-center justify-center">
          <Toaster />
          <form id="FormElement" className="w-[90%] md:w-[40%] max-w-200px">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
              {type === "sign-in" ? "Welcome Back" : "Join Us"}
            </h1>

            {type !== "sign-in" ? (
              <InputBox
                name="fullName"
                type="text"
                placeholder="Full Name"
                icon="fi-rr-user"
              />
            ) : (
              ""
            )}

            <InputBox
              name="email"
              type="email"
              placeholder="Email"
              icon="fi-rr-envelope"
            />

            <InputBox
              name="password"
              type="password"
              placeholder="Password"
              icon="fi-rr-key"
            />

            <button
              className="btn-dark center mt-14"
              type="submit"
              onClick={handleSubmit}
            >
              {type.replace("-", " ")}
            </button>

            <div className="relative w-full flex items-center gap-2 my-10 opacity-8 uppercase text-black font-black">
              <hr className="w-1/2 border-black"></hr>
              <p className="text-dark-grey">OR</p>
              <hr className="w-1/2 border-black"></hr>
            </div>

            <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
              <img
                src={googleIcon}
                className="w-5"
                onClick={handleGoogleAuth}
              />{" "}
              continue with Google
            </button>

            {type === "sign-in" ? (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Don't have an account ?
                <Link
                  to="/signup"
                  className="underline text-black text-xl ml-1"
                >
                  Join Now
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Already a member ?
                <Link
                  to="/sign-in"
                  className="underline text-black text-xl ml-1"
                >
                  Sign in here
                </Link>
              </p>
            )}
          </form>
        </section>
      </PageAnimation>
    </div>
  );
};

export default UserAuthFormPage;
