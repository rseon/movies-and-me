// eslint-disable-next-line import/no-unresolved
import { TMDB_API_TOKEN } from '@env';

export function getFilmsFromApiWithSearchedText(text, page = 1) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_TOKEN}&language=fr&query=${text}&page=${page}`;

  return fetch(url)
    .then((response) => response.json());
}

export function getImageFromApi(name) {
  return `https://image.tmdb.org/t/p/w300${name}`;
}

export function getFilmDetailFromApi(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_TOKEN}&language=fr`)
    .then((response) => response.json());
}
