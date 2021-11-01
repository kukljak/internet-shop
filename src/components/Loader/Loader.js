import React from "react";
import ReactDOM from "react-dom";
import LoaderSpinner from "react-loader-spinner";
import "./Loader.css"

const portal = document.getElementById("portal");

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="loader">
            <LoaderSpinner type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
        ,
        portal
    )
}

export default Loader;