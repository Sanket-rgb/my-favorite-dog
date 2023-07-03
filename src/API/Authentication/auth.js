import { baseUrl, loginEndpoint, logoutEndpoint } from "../endpoints";
export const login = async (params) => {
  const url = baseUrl + loginEndpoint;

  const LoginData = { name: params.name, email: params.email };

  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(LoginData),
  };

  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    window.alert("Error:" + error);
  }
};

export const logout = async () => {
  const url = baseUrl + logoutEndpoint;

  const requestOptions = {
    method: "POST",
    credentials: "include",
  };

  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    window.alert("Error:" + error);
  }
};
