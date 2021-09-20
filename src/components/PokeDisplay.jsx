import React from "react"

const PokeDisplay = ({ pokeImage, setIsPokemonChosen, currentPokemonName }) => {
  return (
    <div className="pokemon-show-box">
      <img className="poke-img" src={pokeImage} alt="pokeman" />
      <h2>{currentPokemonName}</h2>
      <p>Pokemon info here lorem lorem lorem asasdasdasd lorem</p>
      <button onClick={() => setIsPokemonChosen(false)}>Close this Box</button>
    </div>
  )
}

export default PokeDisplay
