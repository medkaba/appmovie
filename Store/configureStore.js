/**
 * Création du store redux pour enregistrement des states
 */
import {createStore, combineReducers} from 'redux'
import toggleFavoriteReducer from './Reducers/favoriteReducer'
import setAvatarReducer from './Reducers/setAvatarReducer'

export default createStore(combineReducers({
  toggleFavoriteReducer,
  setAvatarReducer
}))