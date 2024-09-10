import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { PokemonCard } from "../PokemonCard";
import { Details } from "../Details";
import { BackButton } from "../BackButton";
import { Overlay } from "../Overlay";
import "./DetailsView.css";

function DetailsView({pokemon, setSelectedPokemon }) {
    const detailsViewRef = useRef(null);
    const [isHideOverlay, setIsHideOverlay] = useState(false);
    const [pokemonData, setPokemonData] = useState(pokemon);


    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    const handleBackClick = () => {
        setIsHideOverlay(true);

        detailsViewRef.current.classList.add("hidden");

        setTimeout(() => {
            setSelectedPokemon(-1);
        }, 500);
    };

    // set pokemon data from evolution chain
    const setPokemonDatas = (data) => {
        setPokemonData(data);
    };

    return ReactDOM.createPortal(
        <div>
            <Overlay hidden={isHideOverlay} onClick={handleBackClick} />,
            <div className="details-view-container shown" ref={detailsViewRef}>
                <BackButton onClick={handleBackClick} />
                <PokemonCard pokemon={pokemonData} />
                <Details pokemon={pokemonData} setPokemonData={setPokemonDatas} />
            </div>
        </div>,
        document.body
    );
}

export default DetailsView;
