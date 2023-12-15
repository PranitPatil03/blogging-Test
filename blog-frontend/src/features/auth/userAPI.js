import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserAuth } from "./userSlice";

export async function createUser(userData) {
  try {
    const response = await fetch(
      "http://localhost:2000/auth" + userData.serverRoute,
      {
        method: "POST",
        body: JSON.stringify(userData.formData),
        headers: { "content-type": "application/json" },
      }
    );

    const data = await response.json();
    console.log("Inside createUser ");
    console.log(data);
    return { data };
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.error || "An error occurred");
  }
}