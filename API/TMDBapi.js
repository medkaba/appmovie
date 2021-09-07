/**
 * Chargement des films
 * @param {String} searchedText Texte de recherche
 * @param {Number} currentPage Page courante
 * @return {Promise} 
 */
export function getFilms(searchedText, currentPage){
  return fetch("https://api.themoviedb.org/3/search/movie?api_key=603176dc2a6a859ffe6ca5d4dd3406cf&language=fr&query="+searchedText+"&page="+currentPage)
  .then(response => response.json())
  .catch(error => {[]})
}
/**
 * Chargement d'un film
 * @param {string} id ID du film à charger
 * @return {Promise}
 */
export function getFilmDetails(id){
  return fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=603176dc2a6a859ffe6ca5d4dd3406cf&language=fr")
  .then(response => response.json())
  .catch(error => undefined)
}
/**
 * Constructeur URL Image film
 * @param {String} image Nom image
 * @return {String}
 */
export function getURLImageFilm(image){
  if(image!==null && image!==undefined && image !=='') return 'https://image.tmdb.org/t/p/w300'+image
}