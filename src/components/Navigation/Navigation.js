import React from "react";
import NavigationLink from "./NavigationLink";
import generations from "../../data/generations";
import "./Navigation.css";

function Navigation() {
    return (
        <div className="navigation-container">
            <h3 className="navigation-title">Select Generation:</h3>

            <div className="links-container">
                {generations.map(({id, link, text}) => {
                    return (
                        <NavigationLink exact key={id} to={link}>
                            {text}
                        </NavigationLink>
                    );
                })}
            </div>
        </div>
    );
}

export default Navigation;