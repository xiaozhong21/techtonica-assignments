import React, { useState, useEffect } from 'react'
import Score from './Score'
import Deck from './Deck'
import { shufflePokemons } from './helpers'


export default function Board() {
  const POKEMON_NUMBER = 12;

  //Set states
  const [pokemons, setPokemons] = useState([]);
  const [clickHistory, setClickHistory] = useState([]);
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  //Fetch pokemon name, id, and image from pokemon API
  const fetchPokemons = async (number) => {
    const pokemons = []

    for (let i = 1; i <= number; i++) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`
      const response = await fetch(pokemonUrl)
      const pokemon = await response.json()
      const {id, name, sprites} = pokemon;
      // const id = pokemon.id
      // const name = pokemon.name
      const image = sprites.front_default
      pokemons.push({ id, name, image })
    }

    return pokemons
  }

  //Shuffle the array of pokemons retrieved from API upon page loading
  useEffect(() => {
    const loadCards = async () => {
      setPokemons(shufflePokemons(await fetchPokemons(POKEMON_NUMBER)))
    };

    loadCards()
  }, []) // <--  empty array means 'run once' after initial render, similar to componentDidMount

  //Handle effects of current score on best score and game reset
  useEffect(() => {
    setBestScore((prevBestScore) => currentScore > prevBestScore ? currentScore : prevBestScore);
    if (currentScore === 12) {
      alert("Awesome! You achieved the highest possible score of 12!")
      setCurrentScore(0);
      setClickHistory([]);
    };
    if (currentScore === 0) {
      setCurrentScore(0);
      setClickHistory([]);
    }
  }, [currentScore])

  // Handle clicks on cards
  const handleClick = (pokemon) => {
    setCurrentScore((prevScore) => clickHistory.includes(pokemon) ? 0 : prevScore + 1);
    setPokemons((prevPokemons) => shufflePokemons(prevPokemons));
    setClickHistory(() => ([...clickHistory, pokemon]));
  }

  return (
    <div>
      <h1 className="header">PoKeMoN Memory Game</h1>
      <h4 className="description">Get points by clicking on an image but don't click on any more than once!</h4>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <Deck pokemons={pokemons} onClick={handleClick} />
    </div>
  )
}
