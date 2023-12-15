export function createUser(userData,setUserAuth) {
    return new Promise(async (resolve) => {
      const response = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      setUserAuth(data)
      resolve({ data });
    });
  }