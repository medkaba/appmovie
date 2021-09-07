import React from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
const Loading = props =>{
  return(
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  )
}
export default Loading
const styles = StyleSheet.create({
  container:{
    position:'absolute',
    left:0,
    right:0,
    top:'40%',
    right:0,
    justifyContent:'center',
    alignItems:'center'
  }
})