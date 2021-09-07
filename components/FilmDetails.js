import React, {useState, useEffect} from 'react'
import { ScrollView, Button, Text, Image, TouchableOpacity, StyleSheet, Share, Platform, Alert } from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'
import {getFilmDetails, getURLImageFilm} from '../API/TMDBapi'
import Loading from './Loading'
import EnlargeShrink from '../animations/EnlargeShrink'

function FilmDetail(props){
  const{route} = props
  const id     = route.params.idFilm
  const[film, setFilm] = useState(undefined)
  const[loading, setLoading] = useState(true)
  /**
   * Chargement du film
   * @param {string} id ID du film
   */
  const loadFilm = (id) =>{
    getFilmDetails(id)
    .then((data)=>{
      setFilm(data)
    }).catch((err)=>{
      setFilms(undefined)
    }).finally(()=>setLoading(false))
  }
  /**
   * Ajoute/supprime dans mes favoris
   */
  const toggleFavorite = ()=>{
    const action = {type:'TOGGLE_FAVORITE', value:film}
    props.dispatch(action)
  }
  /**
   * Partager le film
   */
  const shareFilm = async ()  =>{
    try{
      const result = await Share.share({title: film.title, message: film.overview})
    }catch(err){
      Alert.alert('Error système','Erreur de partage ...')
    }
  }
  /**
   * Bouton partager
   * Android : affiche en bas à gauche
   */
  function ShareBTNAdroid(){
    if(film!==undefined){
      if(Platform.OS === 'android'){
        return(
          <TouchableOpacity style={styles.floatingBtn} onPress={shareFilm}>
            <Image style={styles.floatingImg} source={require('../assets/ic_share.png')} />
          </TouchableOpacity>
        )
      }
    }else return null
  }
  /**
   * Bouton favori
   * @returns 
   */
  function FavorisBTN(){
    let sourceImg = undefined
    let shouldEnlarge = false
    if(props.favoritesFilm.findIndex(item=>item.id == film.id) !== -1){// film dans la liste favoris
      sourceImg = require('../assets/ic_favorite.png')
      shouldEnlarge = true
    }else sourceImg = require('../assets/ic_favorite_border.png')
    
    return(
      <TouchableOpacity style={styles.btnFavorite} onPress={toggleFavorite}>
        <EnlargeShrink shouldEnlarge={shouldEnlarge}>
          <Image style={styles.favoriteImg} source={sourceImg} />
        </EnlargeShrink>
      </TouchableOpacity>
    )
  }
  useEffect(()=>{
    // IOS : affiche en haut à gauche ShareBTN (navigation)
    if(Platform.OS==='ios'){
      props.navigation.setOptions({
        headerRight : () => (
          <TouchableOpacity style={styles.floatingBtnIOS} onPress={shareFilm}>
            <Image style={styles.floatingImgIOS} source={require('../assets/ic_share.png')} />
          </TouchableOpacity>
        )}
      )
    }
    loadFilm(id)
  },[id])

  if(loading) return <Loading />
  else return(
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{uri: getURLImageFilm(film.backdrop_path)}} />
      <Text style={styles.title}>{film.title}</Text>
      <FavorisBTN />
      <Text style={styles.overview}>{film.overview}</Text>
      <Text style={styles.default}>Sortie le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
      <Text style={styles.default}>Note : {film.vote_average}</Text>
      <Text style={styles.default}>Nombre de votes : {film.vote_count}</Text>
      <Text style={styles.default}>Budget : {numeral(film.budget).format('0,0[.]00$')}</Text>
      <Text style={styles.default}>Genre(s) : {film.genres.map((genre)=>genre.name).join(" / ")}</Text>
      <Text style={styles.default}>Compagnie(s) : {film.production_companies.map((company)=>company.name).join(" / ")}</Text>      
      <ShareBTNAdroid />
    </ScrollView>
  )
}
const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavoriteReducer.favoritesFilm
  }
}
export default connect(mapStateToProps)(FilmDetail)
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  image:{
    height:169,
    margin:5
  },
  title:{
    fontWeight:'bold',
    fontSize:35,
    flex:1,
    flexWrap:'wrap',
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    marginBottom:10,
    color:'#000000',
    textAlign:'center'
  },
  overview:{
    fontStyle:'italic',
    color:'#666666',
    margin:5,
    marginBottom:15
  },
  sortie:{
    marginLeft:5,
    marginTop:5,
    marginRight:5
  },
  btnFavorite:{
    alignItems:'center'
  },
  favoriteImg:{
    flex:1,
    width:null,
    height:null
  },
  floatingBtn:{
    position:'absolute',
    right:20,
    bottom:20,
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#c91e63',
    justifyContent:'center',
    alignItems:'center'
  },
  floatingBtnIOS:{
    width:45,
    height:45,
    marginRight:10,
    justifyContent:'center',
    alignItems:'center'
  },
  floatingImg:{
    width:45,
    height:45
  },
  floatingImgIOS:{
    width:45,
    height:45
  }
})