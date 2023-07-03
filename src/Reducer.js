export const ACTIONS = {
  SET_BREEDS_LIST: "set-breeds-list",
  SET_DOG_LIST: "set-dog-list",
  SHOW_FILTER_DROPDOWN: "show-filter-dropdown",
  SET_NEXT_LINK: "set-next-link",
  SET_PREV_LINK: "set-prev-link",
  SHOW_MATCH: "show-match",
  SET_SELECTED_BREEDS: "set-selected-breeds",
  SET_SELETED_DOGS: "set-selected-dogs",
  SET_MATCHED_DOG_INFO: "set-matched-dog-info",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_BREEDS_LIST:
      return { ...state, breeds: action.payload };
    case ACTIONS.SET_DOG_LIST:
      return { ...state, dogList: action.payload };
    case ACTIONS.SHOW_FILTER_DROPDOWN:
      return { ...state, filterSection: action.payload };
    case ACTIONS.SET_NEXT_LINK:
      return { ...state, nextLink: action.payload };
    case ACTIONS.SET_PREV_LINK:
      return { ...state, prevLink: action.payload };
    case ACTIONS.SHOW_MATCH:
      return { ...state, showMatch: action.payload };
    case ACTIONS.SET_SELECTED_BREEDS:
      return { ...state, selectedBreeds: action.payload };
    case ACTIONS.SET_SELECTED_DOGS:
      return { ...state, selectedDogs: action.payload };
    case ACTIONS.SET_MATCHED_DOG_INFO:
      return { ...state, matchedDogInfo: action.payload };
    default:
      return state;
  }
}

export const initialState = {
  breeds: [],
  dogList: [],
  filterSection: false,
  nextLink: "",
  prevLink: "",
  showMatch: false,
  selectedBreeds: new Set(),
  selectedDogs: new Set(),
  matchedDogInfo: null,
};
