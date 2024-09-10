import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Overlay.css";

function Overlay({ onClick, hidden }) {
    useEffect(() => {
        document.body.classList.remove("has-overlay");
        return () => {
            document.body.classList.add("has-overlay");
        };
    }, []);

    return ReactDOM.createPortal(
        <div
            className={`overlay ${hidden ? "hidden" : ""}`}
            onClick={onClick}></div>,
        document.body
    );
}

export default Overlay;