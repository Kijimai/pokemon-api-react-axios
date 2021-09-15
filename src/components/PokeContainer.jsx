//take pokemon props
//distribute props
//add color styling based on pokemon type

import React from "react"

const PokeContainer = ({ pokemon }) => {
  return (
    <article>
      <h1>{pokemon.name}</h1>
    </article>
  )
}

export default PokeContainer
