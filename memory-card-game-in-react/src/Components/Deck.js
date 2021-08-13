import React from 'react';
import Card from './Card';


export default function Deck({pokemons, onClick}) {

  return (
    <div className="card-deck">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onClick={() => onClick(pokemon)}/>
      ))}
    </div>
  )
}
