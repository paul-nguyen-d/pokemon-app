import React from 'react';
import { SearchCard } from '../SearchComponent';
import "../../PokemonView/PokemonView.css"

function SearchPokemonView({pokemons, setSelectedPokemon})
{
    return (
        <div className="pokemon-view">
            {pokemons.map((pokemon) => (
                <SearchCard key={pokemon.id} pokemon={pokemon} 
                    setSelectedPokemon={setSelectedPokemon}
                />
            ))}
        </div>
    )
}
export default SearchPokemonView;

