import React, { useState } from "react";
import About from "../../Details/Tabs/About";
import BaseStats from "../../Details/Tabs/BaseStats";
import Evolution from "../../Details/Tabs/Evolution";
import "../../Details/Details.css";

function SearchDetails({ pokemon, setPokemonData }) {
    const [tab, setTab] = useState("about");

    // get pokemon image
    const imageURL =
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.other["official-artwork"].front_default;

    // handle tab switching
    const switchTab = (e) => {
        e.preventDefault();
        setTab(e.target.dataset.tab);
    };

    // return tab switch class name
    const getClassName = (tabName) => {
        return `tab-switch ${tab === tabName ? "active" : ""}`;
    };

    // Change Pokemon data & go to first tab
    const changePokemon = (pokemon) => {
        setPokemonData(pokemon);
        setTab("about");
    };

    return (
        <div className="details-container">
            <img src={imageURL} className="pokemon-image" alt={pokemon.name} />

            <div className="tabs-switch-container">
                <button
                    className={getClassName("about")}
                    data-tab="about"
                    onClick={switchTab}>
                    About
                </button>
                <button
                    className={getClassName("base-stats")}
                    data-tab="base-stats"
                    onClick={switchTab}>
                    Base Stats
                </button>
                <button
                    className={getClassName("evolution")}
                    data-tab="evolution"
                    onClick={switchTab}>
                    Evolution
                </button>
            </div>

            {tab === "about" && <About pokemon={pokemon} />}

            {tab === "base-stats" && <BaseStats stats={pokemon.stats} />}

            {tab === "evolution" && <Evolution pokemon={pokemon} changePokemon={changePokemon}/>}
        </div>
    );
}

export default SearchDetails;
