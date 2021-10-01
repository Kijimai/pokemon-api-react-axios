//fetch url from pokemon api
//distribute retrieved data to components
//add an input to display a new list of pokemon based on parameters
//Show only names of pokemon first, but when user clicks on the name
//show the extended info of the specific pokemon that they clicked
//Add buttons to show the pokemon that is next to it -- FUTURE WISHLIST
//Includes Images, #, Type(s), Location, etc.etc.
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import LoadingScreen from "./components/LoadingScreen"
import PokeContainer from "./components/PokeContainer"
import PokeDisplay from "./components/PokeDisplay"

function App() {
  const [pokeImage, setPokeImage] = useState("")
  const [offset, setOffset] = useState(40)
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState("")
  const [isPokemonChosen, setIsPokemonChosen] = useState(false)
  const [currentPokemonName, setCurrentPokemonName] = useState("")

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1118")
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

  const handleChange = (e) => {
    const value = e.target.value
    setValue(value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const { name } = e.target
    console.log(name)
    if (name === "listBtn") {
      setOffset()
    }
  }

  const handleShowPokemon = (name) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({ data }) => {
        setPokeImage(data.sprites.other["official-artwork"].front_default)
        setIsPokemonChosen(true)
        setCurrentPokemonName(name)
        console.log(pokeImage)
      })
      .catch((err) => console.log(err))
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      <form className="inputs-container">
        <div className="form-control">
          <label htmlFor="search">Search for specific pokemon: </label>
          <input
            value={value}
            onChange={handleChange}
            name="search"
            id="search"
            type="text"
            className="search"
          />
          <button name="searchBtn" onClick={handleClick}>
            Search Pokemon
          </button>
        </div>
        <div className="form-control">
          <label htmlFor="offset-select">Display pokemon per page: </label>
          <select name="offset-select" id="offset-select">
            <option value="">--Choose an offset value--</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
          </select>
          <button name="listBtn" onClick={handleClick}>
            Get new list
          </button>
        </div>
      </form>
      <section className="show-pokemons">
        {isPokemonChosen && (
          <div className="single-pokemon">
            <PokeDisplay
              currentPokemonName={currentPokemonName}
              pokeImage={pokeImage}
              setIsPokemonChosen={setIsPokemonChosen}
            />
          </div>
        )}
        {pokemonList.slice(0, `${offset}`).map((pokemon) => (
          <PokeContainer
            key={pokemon.id}
            pokemon={pokemon}
            handleShowPokemon={handleShowPokemon}
          />
        ))}
      </section>
    </div>
  )
}

export default App
