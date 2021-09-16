//fetch url from pokemon api
//distribute retrieved data to components
//add an input to display a new list of pokemon based on parameters
//Show only names of pokemon first, but when user clicks on the name
//show the extended info of the specific pokemon that they clicked
//Includes Images, #, Type(s), Location, etc.etc.
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import LoadingScreen from "./components/LoadingScreen"
import PokeContainer from "./components/PokeContainer"

function App() {
  const [pokeInfo, setPokeInfo] = useState({
    name: "",
    id: null,
    type: "",
  })
  const [offset, setOffset] = useState(40)
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=60")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          const fetchedPokemon = res.data.results
          setIsLoading(false)
          setPokemonList(fetchedPokemon)
        }
      })
      .catch((err) => {
        console.log("An error has occured!")
        console.log(err)
      })
  }, [])

  const fetchMorePokemon = (offsetAmount) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offsetAmount}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          const results = res.data.results
          console.log(results)
        }
      })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      <div className="inputs-container">
        <input type="text" />
        <label>Display pokemon per page: </label>
        <select id="offset-select">
          <option value="">--Choose an offset value--</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
      </div>
      <section className="show-pokemons">
        {pokemonList.map((pokemon) => (
          <PokeContainer pokemon={pokemon} />
        ))}
      </section>
    </div>
  )
}

export default App
