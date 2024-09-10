import React, { useState, useEffect } from "react";
import { fetchPokemonEvolutionChain, fetchPokemonData } from "../../../api";
import { Loader } from "../../Loader";

function Evolution({ pokemon, changePokemon }) {
    const [currentEvolution, setCurrentEvolution] = useState([]);
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [loading, setLoading] = useState(true);

    // map trigger name to display text
    // eslint-disable-next-line
    const triggerDisplayName = {
        "level-up": "Level",
        "trade": "Trade",
        "use-item": "Use",
    };

    // load evolution chain on mount
    useEffect(() => {
        setLoading(true);
        fetchPokemonEvolutionChain(pokemon.id).then((data) => {
            setEvolutionChain([]);
            setCurrentEvolution(data.chain);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, [pokemon]);

    useEffect(() => {
        getNextEvolution();
        // eslint-disable-next-line
    }, [currentEvolution]);

    const getNextEvolution = () => {
        if (
            currentEvolution.length === 0 ||
            currentEvolution.evolves_to.length === 0
        ) {
            return null;
        }

        // extract useful data from evolution chain
        const current = currentEvolution.species.name;
        const next = currentEvolution.evolves_to[0].species.name;
        const currentId = extractId(currentEvolution.species.url);
        const nextId = extractId(currentEvolution.evolves_to[0].species.url);
        const details = currentEvolution.evolves_to[0].evolution_details[0];
        const trigger = triggerDisplayName[details.trigger.name];
        const triggerValue =
            details.min_level ||
            details.min_happiness ||
            details.item?.name.replace("-", "") ||
            "";

        // base URL for pokemon images
        const imageBaseURL =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

        // get Image URL
        const currentImage = `${imageBaseURL}${currentId}.svg`;
        const nextImage = `${imageBaseURL}${nextId}.svg`;

        // set current evolution to next evolution
        setCurrentEvolution((prev) => prev.evolves_to[0]);

        // push new evolution to array
        setEvolutionChain((prev) => [
            ...prev,
            {
                current,
                next,
                trigger,
                triggerValue,
                currentId,
                nextId,
                currentImage,
                nextImage,
            },
        ]);
    };

    // extract pokemon id from url
    const extractId = (url) => {
        return url.match(/\/(\d+)\//)[1];
    };

    // fetch pokemon data from evolution chain and show its details
    const fetchPokemon = (name) => {
        if(!name || pokemon.name === name) {
            return;
        }
        
        // get pokemon data && show it
        setLoading(true);
        fetchPokemonData(name).then((data) => {
            changePokemon(data);
        });

    }

    return (
        <div className="tab tab-evolution">
            <h2>Evolution Chain</h2>

            {loading && <Loader />}

            { !loading && evolutionChain.length === 0 && (
                <div>This pokemon does not evolve.</div>
            )}

            { !loading &&
                // iterate over evolution chain and display each evolution
                evolutionChain.map((e, i) => {
                    return (
                        <div className="evolution-container" key={i}>
                            <div className="evolve-container evolve-from">
                                <div className="image-container" onClick={()=>{fetchPokemon(e.current)
                                }}>
                                    <div className="bg-pokeball"></div>
                                    <img alt={e.current} src={e.currentImage} />
                                </div>

                                <span>{e.current}</span>
                            </div>

                            <div className="trigger-container">
                                <div className="arrow"></div>
                                {e.trigger} {e.triggerValue}
                            </div>

                            <div className="evolve-container evolve-to" onClick={()=>{fetchPokemon(e.next);}}>
                                <div className="image-container">
                                    <div className="bg-pokeball"></div>
                                    <img alt={e.next} src={e.nextImage} />
                                </div>

                                <span>{e.next}</span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Evolution;
