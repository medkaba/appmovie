import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Search from '../components/Search'
import FilmDetails from '../components/FilmDetails'
import Favorites from '../components/Favorites'

const Stack = createStackNavigator()
const Tab   = createBottomTabNavigator()
/**
 * Navigation "Rechercher" : Stack Navigation
 */
const SearchStackNavigator =()=>{
  return(
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen
        name='Dashboard'
        component={Search}
        options={{
          title:'Dashboard',
          headerStyle:{
            backgroundColor:'#f4511e',
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name='DetailsFilm' component={FilmDetails} options={{title:'Details du film'}} />
    </Stack.Navigator>
  )
}
/**
 * Navigation "Favoris" : Stack Navigation
 */
const FavoritesStackNavigator = ()=>{
  return(
    <Stack.Navigator initialRouteName='Favoris'>
      <Stack.Screen
        name="Favoris"
        component={Favorites}
        options={{
          title:'Mes Favoris',
          headerStyle:{
            backgroundColor:'#f4511e',
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name='DetailsFilm' component={FilmDetails} options={{title:'Details du film'}} />
    </Stack.Navigator>
  )
}

const Navigation = props =>{
  return(
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
          inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
          showLabel: false, // On masque les titres
          showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }}
      >
        <Tab.Screen
          name='Recherche'
          component={SearchStackNavigator}
          options={{
            tabBarLabel:'Recherche',
            tabBarIcon:({color, size})=>{
              return <Image source={require('../assets/ic_search.png')} style={styles.icon} />
            }
          }}
        />
        <Tab.Screen
          name='Favoris'
          component={FavoritesStackNavigator}
          options={{
            tabBarLabel:'Mes Favoris',
            tabBarIcon:({color, size})=>{
              return <Image source={require('../assets/ic_favorite.png')} style={styles.icon} />
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default Navigation
const styles = StyleSheet.create({
  icon:{
    width:30,
    height:30
  }
})