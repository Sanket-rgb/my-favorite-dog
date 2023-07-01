import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDogs, getSearchResults } from "../API/api";
import Card from "../components/UI/Card";
import styles from "../Styles/HomePage.module.css";
function HomePage() {
  const [breeds, setBreeds] = useState([]);
  const [dogList, setDogList] = useState([]);
  const [breedSelected, setBreedSelected] = useState(false);
  const [filterSection, setFilterSection] = useState(false);

  const minAge = useRef("");
  const maxAge = useRef("");

  const selectedBreeds = new Set();

  const location = useLocation();

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
      // setBreedSelected(false);
    } else {
      selectedBreeds.add(breed);
      // setBreedSelected(true);
    }

    console.log(selectedBreeds);
  };

  const getSearchResult = async () => {
    console.log(selectedBreeds);
    setFilterSection(false);

    const ageMin = minAge.current.value;
    const ageMax = maxAge.current.value;
    const breedsArray = [...selectedBreeds];
    // console.log(breedsArray);

    const result = await getSearchResults(breedsArray, ageMin, ageMax).then(
      async (response) => {
        const dogList = await getDogs(response.resultIds);
        console.log(dogList);
        setDogList(dogList);
      }
    );
    console.log(result);
  };

  useEffect(() => {
    const getInitialSearchResult = async () => {
      await getSearchResults(
        [...selectedBreeds],
        minAge.current.value,
        maxAge.current.value
      ).then(async (response) => {
        const dogList = await getDogs(response.resultIds);
        console.log(dogList);
        setDogList(dogList);
      });
    };

    getInitialSearchResult();
  }, []);

  return (
    <main className={styles["homepage__container"]}>
      <header className={styles["homepage__navbar"]}>
        <h2>Welcome, {location.state.name}</h2>
        <h4>Logout</h4>
      </header>
      {!filterSection && (
        <h5 onClick={() => setFilterSection(true)}>Filter options</h5>
      )}
      {filterSection && (
        <section className={styles["homepage__filters"]}>
          <p onClick={() => setFilterSection(false)}>close</p>
          <div className={styles["breeds__filter"]}>
            {breeds?.map((breed) => {
              return (
                <DivComponent
                  key={breed}
                  onClick={() => handleBreedSelection(breed)}
                  breed={breed}
                />
              );
            })}
          </div>
          <div className={styles["inputs"]}>
            <input
              type="number"
              placeholder="Enter minimum age"
              ref={minAge}
            ></input>
            <input
              type="number"
              placeholder="Enter maximum age"
              ref={maxAge}
            ></input>
            <button
              className={styles["search"]}
              type="button"
              onClick={getSearchResult}
            >
              Search
            </button>
          </div>
        </section>
      )}
      <section className={styles["dog_list__container"]}>
        {dogList?.map((dog) => (
          <Card
            key={dog.id}
            name={dog.name}
            age={dog.age}
            img={dog.img}
            breed={dog.breed}
            zip_code={dog.zip_code}
          />
        ))}
      </section>
    </main>
  );
}

function DivComponent({ breed, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <div
      className={`${styles["breed"]}
    ${styles[selected ? "breedSelected" : ""]}
    `}
      onClick={handleClick}
    >
      {breed}
    </div>
  );
}

export default HomePage;
