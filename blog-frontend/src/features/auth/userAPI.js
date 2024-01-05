import toast from "react-hot-toast";
import { StoreSession } from "../../common/Session";
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
    StoreSession("user", JSON.stringify(data.User));
    setUserAuth(data);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.error || "An error occurred");
  }
}