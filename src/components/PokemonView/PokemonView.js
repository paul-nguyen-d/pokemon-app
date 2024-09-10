import "./PokemonView.css";
import { PokemonCard } from "../PokemonCard";
import { useEffect, useState, React} from "react";
import { fetchPokemonData, fetchPokemons } from "../../api";
import { DetailsView } from "../DetailsView";
import { Loader } from "../Loader";



function PokemonView({ generation }) {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(-1);

    // load all pokemons on mount & generation change
    useEffect(() => {
        fillPokemonsArray();
        // eslint-disable-next-line
    }, [generation]);

    // fetch all pokemons and push to pokemons array
    const fillPokemonsArray = () => {

        // set loading state and rest pokemons array
        setIsLoading(true);
        setPokemons([]);

        if (generation.limit == null || generation.offset == null) {
            return;
        }

        //fetch first original 151 pokemons
        fetchPokemons(generation.limit, generation.offset).then(
            async ({ results }) => {
                let newPokemons = [];

                //iterate over each pokemon and add to array (Promise only working with results.map)
                await Promise.all(
                    results.map(async (pokemon, i) => {
                        // fetch pokemon data
                        await fetchPokemonData(pokemon.name).then(
                            async (json) => {
                                newPokemons[i] = json;
                            }
                        );
                    })
                );

                setPokemons(newPokemons);
                setIsLoading(false);
            }
        );
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <div className="pokemon-view">
                {pokemons.map((pokemon, i) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => setSelectedPokemon(i)}
                    />
                ))}
            </div>
            {selectedPokemon !== -1 && (
                <DetailsView pokemon={pokemons[selectedPokemon]} setSelectedPokemon={setSelectedPokemon}/>
            )}
        </>
    );
}

export default PokemonView;
