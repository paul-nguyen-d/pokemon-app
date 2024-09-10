import { useEffect, useState } from "react";
import { fetchPokemonData, fetchPokemonsByName } from "../../api";
import { Loader } from "../Loader";

import { SearchDetailsView } from "./SearchComponent";
import { SearchPokemonView } from "./SearchComponent";

import "./SearchBox.css";

function SearchBox() {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    // load all pokemons on mount
    useEffect(() => {
        fillPokemonsArray();
    }, []);

    // fetch all pokemons and push to array
    const fillPokemonsArray = () => {
        // set loading state and reset pokemons array
        setIsLoading(true);
        setPokemons([]);

        // fetch first original 151 pokemons
        fetchPokemonsByName(900).then(async ({ results }) => {
            // iterate over each pokemon an add to array
            await Promise.all(
                results.map(async (pokemon, i) => {
                    await fetchPokemonData(pokemon.name).then(async (json) => {
                        await setPokemons((prev) => {
                            let tmp = prev.slice();
                            tmp[i] = json;
                            return tmp;
                        });
                    });
                })
            );

            setIsLoading(false);
        });
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const fileteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    // render
    return (
        <div className="searchPageContainer">
            <div className="heading">
                <h1>Pokemon Database</h1>
                <div class="hr anim"></div>
            </div>

            <div className="searchInputContainer">
                <input
                    className="searchField"
                    type="search"
                    placeholder="Search Pokemon"
                    onChange={handleChange}
                />
            </div>

            {selectedPokemon !== -1 && (
                <SearchDetailsView
                    pokemon={pokemons[selectedPokemon]}
                    setSelectedPokemon={setSelectedPokemon}
                />
            )}

            {isLoading ? (
                <Loader />
            ) : (
                <SearchPokemonView
                    pokemons={fileteredPokemons}
                    setSelectedPokemon={setSelectedPokemon}
                />
            )}
        </div>
    );
}

export default SearchBox;
