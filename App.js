import React from 'react'
import {Provider} from 'react-redux'
import Navigation from './Navigation/Navigation'
import StoreRedux from './Store/configureStore'
export default function App(){
  return(
    <Provider store={StoreRedux}>
      <Navigation />
    </Provider>
  )
}