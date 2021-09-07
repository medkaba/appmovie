import React from 'react'
import {StyleSheet, View} from 'react-native'
import FilmList from './FilmList'
import Avatar from './Avatar'

/**
 * Liste films favoris
 * @param {*} propss 
 * @returns 
 */
export default function Favorite(props){
  return(
    <View style={styles.container}>
      <View style={styles.cAvatar}>
        <Avatar />
      </View>
      <FilmList
        favoriteList={true}
        {...props}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:0,
    paddingLeft:5,
    paddingRight:5
  },
  cAvatar:{
    alignItems:'center'
  }
})