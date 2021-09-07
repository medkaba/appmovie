const initialState = {def: require('../../assets/ic_tag_faces.png'), uri:null}
/**
 * Reducer avatar (update)
 * @param {*} state l'etat actuelle avatar
 * @param {*} action objet disposant un type permettant de renvoyer un nouvel etat
 * @return {Object} nextState
 */
export default function(state = initialState, action){
  let nextState
  switch(action.type){
    case 'SET_AVATAR':
      nextState = {...state, def:null, uri:{uri:action.value}}
      return nextState
    default: return state
  }
}