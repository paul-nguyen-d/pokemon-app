import React from "react";
import "./PokemonCard.css";

function PokemonCard({ pokemon: { name, id, sprites, types }, onClick}) {
    // get pokemon image from URL
    const pokemonImage = sprites.other.dream_world.front_default || sprites.other['official-artwork'].front_default;
    // const pokemonImage = sprites.other.dream_world.front_default;

    // add css class for each pokemon type
    const styleClass = types.map((t) => "type-" + t.type.name).join(" ");

    // pad pokemon id with zeros
    const pokemonId = "#" + id.toString().padStart(3, "0");

    // render pokemon card
    return (
        <div className="pokemonCard-container" onClick={onClick}>
            <div className={`pokemonCard ${styleClass}`}>
                <div className="bg-pokeball"></div>
                <span className="pokemon-id">{pokemonId}</span>
                <div className="pokemonCard-title">
                    <h2>{name.replace(/-/g,' ')}</h2>

                    <div className="pokemon-types">
                        {types.map((t,i) => {
                            return (
                                <span className="type" key={i}>
                                    {t.type.name}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="pokemon-image">
                    <img alt={name} src={pokemonImage} />
                </div>
            </div>
        </div>
    );
}
export default PokemonCard;
