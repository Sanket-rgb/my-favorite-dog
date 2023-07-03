import {
  baseUrl,
  dogsBreedsEndpoint,
  dogsSearchEndpoint,
  dogsEndpoint,
  dogsMatchEndpoint,
} from "./endpoints";

export const getDogsBreeds = async () => {
  const url = baseUrl + dogsBreedsEndpoint;

  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    window.alert("Error:" + error);
  }
};

export const getDogs = async (dogIds) => {
  const url = baseUrl + dogsEndpoint;

  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
  };
  try {
    const response = await fetch(url, requestOptions);
    console.log(response);
    const responseBody = await response.text();

    const data = JSON.parse(responseBody);

    return data;
  } catch (error) {
    window.alert("Error:" + error);
  }
};

export const getNextPrevSearchResults = async (link) => {
  const url = baseUrl + link;

  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseBody = await response.text();

    const data = JSON.parse(responseBody);

    return data;
  } catch (error) {
    window.alert("Error:" + error);
  }
};

export const generateDogMatch = async (ids) => {
  const url = baseUrl + dogsMatchEndpoint;

  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseBody = await response.text();

    const data = JSON.parse(responseBody);
    // console.log(data);
    return data;
  } catch (error) {
    window.alert("Error:" + error);
  }
};

export const getSearchResults = async (breeds, ageMin, ageMax, sort) => {
  console.log(breeds);

  const params = new URLSearchParams();

  // Add the breeds array as a query parameter
  if (breeds.length > 0) {
    breeds.forEach((breed) => {
      params.append("breeds", breed);
    });
  }

  // Add ageMin query parameter if available
  if (ageMin !== "") {
    params.append("ageMin", +ageMin);
  }

  // Add ageMax query parameter if available
  if (ageMax !== "") {
    params.append("ageMax", +ageMax);
  }

  // Add sort option with field name
  if (sort === "desc") {
    params.append("sort", "breed:desc");
  } else {
    params.append("sort", "breed:asc");
  }
  // Construct the final URL with query parameters
  const url = `${baseUrl + dogsSearchEndpoint}?${params}`;

  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const responseBody = await response.text();

      const data = JSON.parse(responseBody);
      console.log(data);

      return data;
    } else {
      window.alert("Error : Status Code " + response.status);
    }
  } catch (error) {
    window.alert("Error:" + error);
  }
};
