import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { changeLogStatus, changeRegStatus } from "../../store/AuthSlice";
import ClosePopupIcon from "./icons/ClosePopupIcon"
import "./UnauthorizedLike.css";

const portal = document.getElementById("portal");

const UnauthorizedLike = (props) => {
    const dispatch = useDispatch();

    function redirectLogin() {
        dispatch(changeLogStatus(true));
        props.closePopup(false)
    }

    function redirectRegister() {
        dispatch(changeRegStatus(true));
        props.closePopup(false)
    }

    return ReactDOM.createPortal(
        <div className="unauthorizeBlock">
            <div className="unauthorize-container">
                <ClosePopupIcon closePopup={() => props.closePopup(false)}/>
                <h3>
                    To continue please register or log in
                </h3>
                <button className="signInBtn" onClick={() => redirectLogin()}>Continue to sign in</button>
                <button className="registerBtn" onClick={() => redirectRegister()}>Continue to register</button>
                <button className="guestBtn" onClick={() => props.closePopup(false)}>Continue as guest</button>
            </div>
        </div>
        ,
        portal
    )
}

export default UnauthorizedLike;