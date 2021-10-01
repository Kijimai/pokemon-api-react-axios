//take pokemon props
//distribute props
//add color styling based on pokemon type

import React from "react"

const PokeContainer = ({ pokemon, handleShowPokemon }) => {
  console.log(pokemon)
  return (
    <article key={pokemon.id}>
      <button
        name={pokemon.name}
        className="btn pokemon-btn"
        onClick={(e) => handleShowPokemon(e.target.name)}
      >
        {pokemon.name}
      </button>
    </article>
  )
}

export default PokeContainer
