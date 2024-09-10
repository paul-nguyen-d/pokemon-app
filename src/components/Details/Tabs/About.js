import React from "react";

function About({ pokemon }) {
    // Join types names into a string
    const types = pokemon.types.map((t) => t.type.name).join(", ");

    // Join abilities names into a string
    const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");

    // calculate pokemon height in cm
    const height = pokemon.height * 10;

    // calculate pokemon weight in kg
    const weight = pokemon.weight / 10;

    return (
        <div className="tab pokemon-about">
            <table>
                <tbody>
                    <tr>
                        <td>Species</td>
                        <td>{types}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{height} cm</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{weight} kg</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td>{abilities}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default About;