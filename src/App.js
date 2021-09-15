//fetch url from pokemon api
//distribute retrieved data to components
//add an input to display a new list of pokemon based on parameters
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import LoadingScreen from "./components/LoadingScreen"
import PokeContainer from "./components/PokeContainer"

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          const fetchedPokemon = res.data
          // setIsLoading(false)
          setPokemonList(fetchedPokemon)
        }
      })
      .catch((err) => {
        console.log("An error has occured!")
        console.log(err)
      })
  }, [])

  console.log(pokemonList)

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      {/* {pokemonList.map((pokemon) => {
        return <PokeContainer pokemon={pokemon} />
      })} */}
    </div>
  )
}

export default App
