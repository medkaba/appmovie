import React, {useRef} from 'react'
import {Animated} from 'react-native'
const EnlargeShrink = (props) =>{
  const {shouldEnlarge} = props
  const viewSizeAnime = useRef(new Animated.Value(shouldEnlarge?80:40)).current
  const viewIn = Animated.spring(viewSizeAnime,{
    toValue: shouldEnlarge?80:40,
    useNativeDriver: false,
  }).start()
  return(
    <Animated.View style={{width:viewSizeAnime, height:viewSizeAnime}}>
      {props.children}
    </Animated.View>
  )
}
export default EnlargeShrink