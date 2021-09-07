import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {getURLImageFilm} from '../API/TMDBapi'
import FadIn from '../animations/FadIn'
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row'
  },
  image:{
    width:120,
    height:180,
    margin:2,
    backgroundColor:'gray'
  },
  details:{
    flex:1,
    margin:5,
  },
  header:{
    flex:3,
    flexDirection:'row',
  },
  title:{
    flex:1,
    flexWrap:'wrap',
    fontWeight:'bold',
    fontSize:20,
    paddingRight:5,
  },
  vote:{
    fontWeight:'bold',
    fontSize:26,
    color:'#666666'
  },
  description:{
    flex:7,
  },
  descVal:{
    fontStyle:'italic',
    color:'#666666'
  },
  date:{
    flex:1,
  },
  dateVal:{
    textAlign:'right',
    fontSize:14
  },
  favorteImg:{
    width:25,
    height:25,
    marginRight:5
  }
})
export default function FilmItem({Film, DisplayDetails, IsFavorite}){
  return(
    <FadIn>
      <TouchableOpacity onPress={()=>DisplayDetails(Film.id)} style={styles.container}>
        <Image style={styles.image} source={{uri: getURLImageFilm(Film.poster_path)}} />
        <View style={styles.details}>
          <View style={styles.header}>
            {IsFavorite&&<Image style={styles.favorteImg} source={require('../assets/ic_favorite.png')} />}
            <Text style={styles.title}>{Film.title}</Text>
            <Text style={styles.vote}>{Film.vote_average}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descVal} numberOfLines={6}>{Film.overview}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateVal}>{Film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </FadIn>
  )
}