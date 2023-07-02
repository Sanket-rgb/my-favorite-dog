import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDogs,
  getNextPrevSearchResults,
  getSearchResults,
} from "../API/api";
import DivComponent from "../components/DivComponent";
import Card from "../components/UI/Card";
import styles from "../Styles/HomePage.module.css";
function HomePage() {
  const [breeds, setBreeds] = useState([]);
  const [dogList, setDogList] = useState([]);
  const [filterSection, setFilterSection] = useState(false);

  const [nextLink, setNextLink] = useState("");
  const [prevLink, setPrevLink] = useState("");

  const [selectedBreeds, setSelectedBreeds] = useState(new Set());
  const [selectedDogs, setSelectedDogs] = useState(new Set());

  const minAge = useRef("");
  const maxAge = useRef("");

  // const selectedBreeds = new Set();
  // const selectedDogs = new Set();

  const location = useLocation();

  useEffect(() => {
    const getInitialSearchResult = async () => {
      await getSearchResults(
        [...selectedBreeds],
        minAge.current.value,
        maxAge.current.value
      ).then(async (response) => {
        if (response.next) {
          setNextLink(response.next);
        } else {
          setNextLink("");
        }

        if (response.prev) {
          setPrevLink(response.prev);
        } else {
          setPrevLink("");
        }

        const dogList = await getDogs(response.resultIds);
        console.log(dogList);
        setDogList(dogList);
      });
    };

    getInitialSearchResult();
  }, []);
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
    setSelectedBreeds(selectedBreeds);
    console.log(selectedBreeds);
  };

  const selectDog = (id) => {
    if (selectedDogs.has(id)) {
      selectedDogs.delete(id);
    } else {
      selectedDogs.add(id);
    }
    setSelectedDogs(selectedDogs);
    console.log(selectedDogs);
  };

  const getSearchResult = async () => {
    console.log(selectedBreeds);
    setFilterSection(false);

    const ageMin = minAge.current.value;
    const ageMax = maxAge.current.value;
    const breedsArray = [...selectedBreeds];
    // console.log(breedsArray);

    await getSearchResults(breedsArray, ageMin, ageMax).then(
      async (response) => {
        console.log(response);
        if (response.next) {
          setNextLink(response.next);
        } else {
          setNextLink("");
        }

        if (response.prev) {
          setPrevLink(response.prev);
        } else {
          setPrevLink("");
        }
        const dogList = await getDogs(response.resultIds);
        console.log(dogList);
        setDogList(dogList);
      }
    );
  };

  const getNextPrevResults = async (link) => {
    await getNextPrevSearchResults(link).then(async (response) => {
      console.log(response);
      if (response.next) {
        setNextLink(response.next);
      } else {
        setNextLink("");
      }

      if (response.prev) {
        setPrevLink(response.prev);
      } else {
        setPrevLink("");
      }
      const dogList = await getDogs(response.resultIds);
      console.log(dogList);
      setDogList(dogList);
    });
  };

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
            onClick={() => selectDog(dog.id)}
            isSelected={selectedDogs.has(dog.id)}
          />
        ))}
      </section>
      <div className={styles["pagination__buttons"]}>
        <button
          onClick={() => getNextPrevResults(prevLink)}
          style={{ backgroundColor: prevLink === "" ? "" : "white" }}
          disabled={prevLink === "" ? true : false}
        >
          {"<"}
        </button>
        <button
          onClick={() => getNextPrevResults(nextLink)}
          style={{ backgroundColor: nextLink === "" ? "" : "white" }}
          disabled={nextLink === "" ? true : false}
        >
          {">"}
        </button>
      </div>
    </main>
  );
}

export default HomePage;
