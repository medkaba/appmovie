import React, {useRef} from 'react'
import {Animated, Dimensions} from 'react-native'
const FadIn = (props) =>{
  const fadeAnime = useRef(new Animated.Value(Dimensions.get('window').width)).current
  const fade_in = Animated.spring(fadeAnime,{
    toValue: 0,
    useNativeDriver: false,
  }).start()
  return(
    <Animated.View style={{left: fadeAnime}}>
      {props.children}
    </Animated.View>
  )
}
export default FadIn