import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLogStatus, changeRegStatus } from "../../store/AuthSlice";
import { recordUser } from "../../store/UserSlice";
import ClosePopupIcon from "./icons/ClosePopupIcon";
import OpenEye from "./icons/OpenEye";
import ClosedEye from "./icons/ClosedEye";
import "./Login.css";
import { changeLoaderStatus } from "../../store/LoaderSlice";
import { recordFavourite } from "../../store/FavouriteSlice";

const portal = document.getElementById("portal");

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userInfo);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    function loginUser() {
        dispatch(changeLoaderStatus(true));
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": "Ruslan1234!",
            })
        })
        .then( res => {
            if (res.ok) {
                dispatch(changeLogStatus(false));
                return res.json();
            } else if (res.status === 401) {
                console.log("Not authorize")
            }
        })
        .then(data => { 
            dispatch(recordUser(data));
            data && getFavourite(data);
        })
        
    }
    
    function recordEmail (event) {
        setEmail(event.target.value);
    }

    function recordPassword (event) {
        setPassword(event.target.value);
    }

    function getFavourite(value) {
        fetch(`/api/products/favorites?offset=0&limit=20`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + value.token,
            }
        })
        .then(res => res.json())
        .then(data => {dispatch(recordFavourite(data))});
    }


    return ReactDOM.createPortal(
        <div className="loginBlock">
            <div className="login-container">
                <h3>
                    Login
                    <span onClick={() => dispatch(changeLogStatus(false))}>
                        <ClosePopupIcon />
                    </span>
                </h3>
                <form>
                    <input 
                        pattern="\S+@\S+" 
                        type="email" 
                        placeholder="Email" 
                        onChange={ (event) => {recordEmail(event)}}                            
                    />
                    {email === null ? <label className="name">Incorrect input text</label> : null}
                    <input 
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        onChange={ (event) => {recordPassword(event)}}                         
                    />
                    { showPassword ? 
                        <OpenEye hidePass={ status => setShowPassword(status)} /> 
                        : 
                        <ClosedEye showPass={ status => setShowPassword(status)} />                            
                    }
                </form>
                <div className="login-btn">
                    <button type="button" onClick={ () => {loginUser()}}>Login</button>          
                </div>
            </div>
            <div className="redirectRegister">
                <h5>
                    I have no account,   
                    <span className="register" onClick={() => {dispatch(changeRegStatus(true)); dispatch(changeLogStatus(false)) }}>
                        Register now
                    </span>
                </h5>
            </div>
        </div>
        ,
        portal
    )
}

export default Login;