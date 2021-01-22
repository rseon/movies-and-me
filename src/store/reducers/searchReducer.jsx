/* global toast */

const initialState = {
  searches: [],
};

export default function saveSearch(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'SAVE_SEARCH':
      if (state.searches.findIndex((item) => item === action.value) === -1) {
        nextState = {
          ...state,
          searches: [...state.searches, action.value],
        };
      }
      return nextState || state;
    case 'REMOVE_SEARCH':
      nextState = {
        ...state,
        searches: state.searches.filter((item) => item !== action.value),
      };
      toast.show('Recherche supprimée', { type: 'success' });
      return nextState || state;

    // Not used
    case 'RESET_SEARCH':
      nextState = {
        ...state,
        searches: [],
      };
      return nextState || state;
    default:
      return state;
  }
}
