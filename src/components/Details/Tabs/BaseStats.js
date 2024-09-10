import React from "react";
import { RangeView } from "../../RangeView";

const labels = [
    "HP", 
    "Attack", 
    "Defense", 
    "Sp. Atk", 
    "Sp. Def", 
    "Speed"
];

function BaseStats({ stats }) {
    // calculate total base stats value
    const total = stats.reduce((sum, current) => {
        return sum + parseInt(current.base_stat);
    }, 0);

    return (
        <div className="tab pokemon-base-stats">
            <table>
                <tbody>
                    {
                        labels.map((label, index) => (
                            <tr key={index}>
                                <td>{label}</td>
                                <td>
                                    {stats[index].base_stat}
                                    <RangeView value={stats[index].base_stat}/>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td>Total</td>
                        <td>
                            {total}
                            <RangeView value={total} max='600'/> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BaseStats;
