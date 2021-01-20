/* global toast */

const initialState = {
  favoritesFilm: []
};

export default function toggleFavorite(state = initialState, action) {
  let nextState;

  const favoriteFilmIndex = state.favoritesFilm.findIndex((item) => {
    return item.id === action.value.id;
  });

  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      
      if (favoriteFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
        };
        toast.show('Film retiré des favoris', { type: 'success' });
      } else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        };
        toast.show('Film ajouté aux favoris', { type: 'success' });
      }
      return nextState || state;
    default:
      return state;
  }
}
