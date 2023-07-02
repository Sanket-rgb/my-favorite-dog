const baseUrl = "https://frontend-take-home-service.fetch.com";

export const logout = async () => {
  const endpoint = "/auth/logout";

  const url = baseUrl + endpoint;

  const requestOptions = {
    // method: "POST",
    credentials: "include",
  };

  try {
    const response = await fetch(url, requestOptions);
    console.log(response);
    return response;
    // if (response.ok) {
    //   console.log("Login Successful");
    //   navigate("/login", {

    //     replace: true,
    //   });
    // }
  } catch (error) {
    console.error("Error:", error);
  }
};
