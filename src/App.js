import { Routes, Route, Navigate, NavLink} from "react-router-dom";
import { PokemonView } from "./components/PokemonView";
import { withRouter } from "./HOC";
import generations from "./data/generations";
import { Navigation } from "./components/Navigation";
import "./App.css";
import { SearchBox } from "./components/SearchBox";


function App() {
    return (
        <div className="pokemon-app">
            <h1>
                P<i></i>k&#xE9;mon
            </h1>

            <Navigation />
            <div className="searchContainer">
                <NavLink className="searchButton" activeClassName="active" to="/Search">
                    Search Pokemons
                </NavLink>
            </div>            

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={generations[0].link} />}
                />

                <Route path="/search" element={<SearchBox/>} />

                {generations.map((generation, i) => (
                    <Route
                        key={i}
                        path={'/' + generation.link}
                        element={<PokemonView generation={generation} />}
                    />
                ))}
            </Routes>
        </div>
    );
}

export default withRouter(App);
