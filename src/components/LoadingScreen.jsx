import React from "react"

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <img
        className="loading-image"
        src="https://cdn2.bulbagarden.net/upload/f/f8/083Farfetch%27d.png"
        alt="farfetch'd"
      />
      <div className="loading-speech">
        <h2>Fetching a list of pokemon...</h2>
        <h3>Thanks for being patient!</h3>
      </div>
    </div>
  )
}

export default LoadingScreen
