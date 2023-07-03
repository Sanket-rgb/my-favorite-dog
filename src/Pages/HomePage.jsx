import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  generateDogMatch,
  getDogs,
  getDogsBreeds,
  getNextPrevSearchResults,
  getSearchResults,
} from "../API/api";
import { logout } from "../API/Authentication/auth";
import Breed from "../components/Breed";
import Card from "../components/UI/Card";
import { ACTIONS, initialState, reducer } from "../Reducer";
import styles from "../Styles/HomePage.module.css";

function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { breeds, dogList, filterSection, nextLink, prevLink } = state;

  const [sortOrder, setSortOrder] = useState("asc");
  const [showMatch, setShowMatch] = useState(false);
  const [matchedDogInfo, setMatchedDogInfo] = useState(null);

  const [selectedBreeds, setSelectedBreeds] = useState(new Set());
  const [selectedDogs, setSelectedDogs] = useState(new Set());

  const minAge = useRef("");
  const maxAge = useRef("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchDogBreeds() {
      const response = await getDogsBreeds();
      if (response.ok) {
        const responseBody = await response.text();
        const breeds = JSON.parse(responseBody);

        dispatch({
          type: ACTIONS.SET_BREEDS_LIST,
          payload: breeds,
        });
      } else {
        window.alert("Error : Status Code " + response.status);
      }
    }
    fetchDogBreeds();
  }, []);

  useEffect(() => {
    const getInitialSearchResult = async () => {
      const response = await getSearchResults(
        [],
        minAge.current.value,
        maxAge.current.value,
        sortOrder
      );

      dispatch({
        type: ACTIONS.SET_NEXT_LINK,
        payload: response.next ? response.next : "",
      });

      dispatch({
        type: ACTIONS.SET_PREV_LINK,
        payload: response.prev ? response.prev : "",
      });

      const dogList = await getDogs(response.resultIds);
      console.log(dogList);

      dispatch({
        type: ACTIONS.SET_DOG_LIST,
        payload: dogList,
      });
    };

    getInitialSearchResult();
  }, [sortOrder]);

  const handleBreedSelection = (breed) => {
    const updatedSelectedBreeds = new Set(selectedBreeds);
    if (updatedSelectedBreeds.has(breed)) {
      updatedSelectedBreeds.delete(breed);
    } else {
      updatedSelectedBreeds.add(breed);
    }
    setSelectedBreeds(updatedSelectedBreeds);
    console.log(selectedBreeds);
  };

  const selectDog = (id) => {
    const updatedSelectedDogs = new Set(selectedDogs);
    if (updatedSelectedDogs.has(id)) {
      updatedSelectedDogs.delete(id);
    } else {
      updatedSelectedDogs.add(id);
    }
    setSelectedDogs(updatedSelectedDogs);
  };

  const generateMatch = async (ids) => {
    console.log(ids);

    await generateDogMatch(ids).then(async (response) => {
      console.log(response.match);
      const dogList = await getDogs([response.match]);
      console.log(dogList);
      setMatchedDogInfo(dogList);
    });
    setSelectedDogs(new Set());
    setShowMatch(true);
  };

  const getSearchResult = async () => {
    console.log(selectedBreeds);
    // setFilterSection(false);
    showHideFilterSection(false);

    const ageMin = minAge.current.value;
    const ageMax = maxAge.current.value;
    const breedsArray = [...selectedBreeds];

    await getSearchResults(breedsArray, ageMin, ageMax, sortOrder).then(
      async (response) => {
        console.log(response);

        dispatch({
          type: ACTIONS.SET_NEXT_LINK,
          payload: response.next ? response.next : "",
        });

        dispatch({
          type: ACTIONS.SET_PREV_LINK,
          payload: response.prev ? response.prev : "",
        });

        const dogList = await getDogs(response.resultIds);
        console.log(dogList);

        dispatch({
          type: ACTIONS.SET_DOG_LIST,
          payload: dogList,
        });
      }
    );
  };

  const getNextPrevResults = async (link) => {
    await getNextPrevSearchResults(link).then(async (response) => {
      console.log(response);

      dispatch({
        type: ACTIONS.SET_NEXT_LINK,
        payload: response.next ? response.next : "",
      });

      dispatch({
        type: ACTIONS.SET_PREV_LINK,
        payload: response.prev ? response.prev : "",
      });

      const dogList = await getDogs(response.resultIds);
      console.log(dogList);

      dispatch({
        type: ACTIONS.SET_DOG_LIST,
        payload: dogList,
      });
    });
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleLogout = async () => {
    const response = await logout();

    if (response.ok) {
      navigate("/", { replace: true });
    } else {
      window.alert("Error : Status Code " + response.status);
    }
  };

  const showHideFilterSection = (boolean) => {
    dispatch({
      type: ACTIONS.SHOW_FILTER_DROPDOWN,
      payload: boolean,
    });
  };

  return (
    <div className={styles["homepage__container"]}>
      <header className={styles["homepage__navbar"]}>
        <h2>Welcome, {location.state.name}</h2>
        <h4 onClick={handleLogout}>Logout</h4>
      </header>

      {!filterSection && (
        <h5 onClick={() => showHideFilterSection(true)}>Filter options</h5>
      )}
      {filterSection && (
        <section className={styles["homepage__filters"]}>
          <p onClick={() => showHideFilterSection(false)}>close</p>
          <div className={styles["breeds__filter"]}>
            {breeds?.map((breed) => {
              return (
                <Breed
                  key={breed}
                  onClick={() => handleBreedSelection(breed)}
                  breed={breed}
                  isSelected={selectedBreeds.has(breed)}
                />
              );
            })}
          </div>
          <div className={styles["inputs"]}>
            <select value={sortOrder} onChange={handleOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
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
      <div>
        <h4>{selectedDogs.size} dogs selected</h4>
        <button
          disabled={selectedDogs.size === 0}
          onClick={() => generateMatch([...selectedDogs])}
        >
          Generate match
        </button>
      </div>
      {showMatch && (
        <div className={styles["match__overlay"]}>
          <div className={styles["card__container"]}>
            <p>Match found!</p>
            <Card
              name={matchedDogInfo[0].name}
              age={matchedDogInfo[0].age}
              img={matchedDogInfo[0].img}
              breed={matchedDogInfo[0].breed}
              zip_code={matchedDogInfo[0].zip_code}
              onClick={() => setShowMatch(false)}
              isSelected={false}
            />
          </div>
        </div>
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
    </div>
  );
}

export default HomePage;
