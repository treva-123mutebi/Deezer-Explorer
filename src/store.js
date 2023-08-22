import { createStore } from 'redux';

// Define initial state
const initialState = {
  searchResults: null,
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;