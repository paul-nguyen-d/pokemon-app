import React from "react";
import "./BackButton.css";

function BackButton({ onClick }) {
    return <div className="back-button-container" onClick = {onClick}></div>;
}

export default BackButton;
