const baseUrl = "https://frontend-take-home-service.fetch.com";

export const getDogBreeds = async () => {
  const endpoint = "/dogs/breeds";

  const url = baseUrl + endpoint;

  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    console.log(response);
    const responseBody = await response.text();

    // Convert the response body to an array
    const data = JSON.parse(responseBody);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getSearchResults = async (breeds, ageMin, ageMax) => {
  const endpoint = "/dogs/search";
  console.log(breeds);
  //   const queryParams = [];

  //   if (breeds.length > 0) {
  //     const breedsParam = `breeds=${breeds}`;
  //     queryParams.push(breedsParam);
  //   }

  // Construct the URLSearchParams object
  const params = new URLSearchParams();

  // Add the breeds array as a query parameter
  breeds.forEach((breed) => {
    params.append("breeds", breed);
    // queryParams.push(params);
  });

  // Add ageMin query parameter if available
  if (ageMin !== "") {
    // queryParams.push(`ageMin=${+ageMin}`);
    params.append("ageMin", +ageMin);
  }

  // Add ageMax query parameter if available
  if (ageMax !== "") {
    // queryParams.push(`ageMax=${+ageMax}`);
    params.append("ageMax", +ageMax);
  }

  // Construct the final URL with query parameters
  const url = `${baseUrl + endpoint}?${params}`;

  //   const url =
  //     baseUrl + endpoint + "?" + new URLSearchParams(queryParams).toString();
  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    console.log(response);
    const responseBody = await response.text();
    // console.log(responseBody);
    // Convert the response body to an array
    const data = JSON.parse(responseBody);
    console.log(data);
    return data;
    // setBreeds(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
