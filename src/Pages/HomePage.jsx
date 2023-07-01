import React, { useEffect, useRef, useState } from "react";
import { getSearchResults } from "../API/api";
import styles from "../Styles/HomePage.module.css";
function HomePage() {
  const [breeds, setBreeds] = useState([]);
  const minAge = useRef("");
  const maxAge = useRef("");
  const selectedBreeds = new Set();
  useEffect(() => {
    async function fetchData() {
      const baseUrl = "https://frontend-take-home-service.fetch.com";
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
        // console.log(response);
        const responseBody = await response.text();

        // Convert the response body to an array
        const data = JSON.parse(responseBody);
        // console.log(data);
        setBreeds(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const handleBreedSelection = (breed) => {
    if (selectedBreeds.has(breed)) {
      selectedBreeds.delete(breed);
    } else {
      selectedBreeds.add(breed);
    }
  };

  const getSearchResult = async () => {
    console.log(selectedBreeds);

    const ageMin = minAge.current.value;
    const ageMax = maxAge.current.value;
    const breedsArray = [...selectedBreeds];

    const result = await getSearchResults(breedsArray, ageMin, ageMax);
    console.log(result);
  };

  return (
    <div className={styles["homepage__container"]}>
      <div className={styles["homepage__navbar"]}>
        <h4>Dog</h4>
        <h2>Welcome, Sanket</h2>
      </div>
      <div className={styles["homepage__filters"]}>
        <div className={styles["breeds__filter"]}>
          {breeds?.map((breed) => {
            return (
              <div
                className={styles["breed"]}
                key={breed}
                onClick={() => handleBreedSelection(breed)}
              >
                {breed}
              </div>
            );
          })}
        </div>
        <input type="number" placeholder="minAge" ref={minAge}></input>
        <input type="number" placeholder="maxAge" ref={maxAge}></input>
        <button
          className={styles["search"]}
          type="button"
          onClick={getSearchResult}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default HomePage;
