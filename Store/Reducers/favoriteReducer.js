const initialState = {favoritesFilm:[]}
/**
 * Reducer favorite (ajout ou suppression)
 * @param {*} state l'etat actuelle du favori
 * @param {*} action objet disposant un type permettant de renvoyer un nouvel etat
 * @return {Object} nextState
 */
export default function(state = initialState, action){
  let nextState
  switch(action.type){
    case'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item=>item.id === action.value.id)
      if(favoriteFilmIndex !== -1){ // Le film est dans les favoris, on le supprime de la liste et retourn le nouveau state
        return nextState = {...state, favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)}
      }else{ // Le n'est pas dans les favoris, on l'ajoute à la liste et retourne le nouveau state
        return nextState = {...state, favoritesFilm: [...state.favoritesFilm, action.value]}
      }
    default: return state
  }
}