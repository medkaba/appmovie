import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import {connect} from 'react-redux'

function Avatar(props){
  const{def, uri} = props
  const changeAvatar = ()=>{
    launchImageLibrary({mediaType:'photo', /*maxWidth:100,maxHeight:100*/},(res)=>{
      if(res.didCancel) console.log('User à annuler')
      else if(res.errorCode) console.log('Erreur code '+res.errorCode)
      else if(res.errorMessage) console.log(res.errorMessage)
      else{
        console.log('Photo : ', res.assets[0].uri)
        const action = {type:'SET_AVATAR', value: res.assets[0].uri}
        props.dispatch(action)
      }
    })
  }
  return(
    <TouchableOpacity style={styles.container} onPress={changeAvatar}>
      <Image style={styles.avtar} source={def||uri }/>
    </TouchableOpacity>
  )
}
const mapStateToProps = state =>{
  return{
    def: state.setAvatarReducer.def,
    uri: state.setAvatarReducer.uri
  }
}
export default connect(mapStateToProps)(Avatar)
const styles = StyleSheet.create({
  container:{
    margin:5,
    width:100,
    height:100,
    justifyContent:'center',
    alignItems:'center'
  },
  avtar:{
    width:100,
    height:100,
    borderRadius:50,
    borderColor:'#9B9B9B',
    borderWidth:2
  }
})