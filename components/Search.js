import React, {useState, useEffect} from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'
import FilmList from './FilmList'
import {getFilms} from '../API/TMDBapi'
import Loading from './Loading'
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:0,
    paddingLeft:5,
    paddingRight:5
  },
  textinput: {
    marginVertical:10,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius:6
  }
})
function Search(props){
  const[searchedText, setSearchedText] = useState('')
  const[films, setFilms] = useState([])
  const[page, setPage] = useState(0)
  const[totalPages, setTotalPages] = useState(0)
  const[loading, setLoading] = useState(false)
  /**
   * Chargement des films
   */
  const loadFilms = () =>{
    setLoading(true)
    getFilms(searchedText, page+1)
    .then((data)=>{
      setFilms([...films, ...data.results])
      setPage(data.page)
      setTotalPages(data.total_pages)
    })
    .catch((err)=>{
      setFilms([])
    })
    .finally(()=>setLoading(false))
  }
  /**
   * Lancement recherche et chargement de films
   */
  const onSearch = () =>{
    setFilms([])
    if(searchedText.length >0){
      loadFilms()
    }
  }
  return(
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onSubmitEditing={onSearch}
        onChangeText={(text)=>setSearchedText(text)}
      />
      <Button title="Rechercher" onPress={onSearch}
      />
      <FilmList
        films={films}
        loadFilms={loadFilms}
        page={page}
        totalPages={totalPages}
        {...props}
      />
      {loading&&<Loading />}
    </View>
  )
}
export default Search