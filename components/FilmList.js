import React,{useEffect} from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {connect} from 'react-redux'
import FilmItem from './FilmItem'
/**
 * View liste des films
 */
const FilmList = (props)=>{
  const{favoriteList, films, loadFilms, favoritesFilm, navigation, page, totalPages} = props
  const detailsFilm = (idFilm) =>{
    navigation.navigate('DetailsFilm',{idFilm: idFilm})
  }
  if(favoriteList){
    return(
      <FlatList
        style={styles.list}
        data={favoritesFilm}
        extraData={favoritesFilm}
        keyExtractor={item => item.id.toString()+parseInt(Math.random())}
        renderItem={
          ({item})=><FilmItem Film={item} DisplayDetails={detailsFilm} IsFavorite={true} />
        }
      />
    )
  }else{
    return(
      <FlatList
        style={styles.list}
        data={films}
        extraData={favoritesFilm}
        keyExtractor={item => item.id.toString()+parseInt(Math.random())}
        renderItem={
          ({item})=><FilmItem Film={item} DisplayDetails={detailsFilm} IsFavorite={(favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} />
        }
        onEndReachedThreshold={0.5}
        onEndReached={()=>{if(page < totalPages) loadFilms()}}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavoriteReducer.favoritesFilm
  }
}
export default connect(mapStateToProps)(FilmList)

const styles = StyleSheet.create({
  list:{
    flex:1
  }
})