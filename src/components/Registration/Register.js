import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Register.css";
import { useDispatch } from "react-redux";
import { changeLogStatus, changeRegStatus } from "../../store/AuthSlice";
import ClosedEye from "./icons/ClosedEye";
import OpenEye from "./icons/OpenEye";
import { recordUser } from "../../store/UserSlice";
import ClosePopupIcon from "./icons/ClosePopupIcon";
import { changeLoaderStatus } from "../../store/LoaderSlice";
import { recordFavourite } from "../../store/FavouriteSlice";

const portal = document.getElementById("portal");

const Register = () => {

    const dispatch = useDispatch();

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [usedEmailExc, setUsedEmailExc] = useState(false);

    function registerUser() {

        if (email === undefined) {
            setEmail(null);
        }
        if (phone === undefined) {
            setPhone(null);
        }

        if (fullName && email && password && phone ) {
            dispatch(changeLoaderStatus(true));
            fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fullName": fullName,
                    "email": email,
                    "password": password,
                    "phone": phone
                })
            })
            .then( ( res) => {
                if (res.ok) {
                    setUsedEmailExc(false);
                    dispatch(changeRegStatus(false));
                    return res.json();
                } else if (res.status === 409) {
                    setUsedEmailExc(true);
                }
                })
            .then(data => {
                dispatch(recordUser(data));
                getFavourite(data);
            })
        }
    }

    function recordName (event) {
        const inputText = event.target.value;
        const regEx = /^[a-zA-Z\s]+$/;
        const validFullName = regEx.test(inputText);
        if (validFullName && inputText.length > 2) {
            setFullName(inputText);
        } else {
            setFullName(null);
        }
        
    }

    function recordEmail (event) {
        const inputText = event.target.value;
        const regEx = /\S+@\S+/;
        const validEmail = regEx.test(inputText);

        if (validEmail) {
            setEmail(inputText);
        } else {
            setEmail(undefined);
        }        
    }

    function recordPhone (event) {
        const inputText = event.target.value;
        const regEx = /^(\+)?([0-9]){10,14}$/;
        const validPhone = regEx.test(inputText);

        if(validPhone && inputText.length >= 10 && inputText.length <= 14) {
            setPhone("+" + inputText);
        } else {
            setPhone(undefined);
        }
    }

    function recordPassword (event) {
        const inputText = event.target.value;
        const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
        const validPassword = regEx.test(inputText);

        if (validPassword && inputText.length >= 8 && inputText.length <= 35) {
            setPassword(inputText);
        } else {
            setPassword(undefined);
        }
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
        <div className="registrationBlock">
            <div className="registration">
                <h3>
                    Register
                    <span onClick={() => dispatch(changeRegStatus(false))}>
                        <ClosePopupIcon />
                    </span>
                </h3>
                <form>
                    <input 
                        pattern="^[a-zA-Z\s]+$" 
                        type="text" 
                        placeholder="Full Name" 
                        onChange={ (event) => {recordName(event)}} 
                    />
                    {fullName === null && <label className="name">Incorrect input text</label>}
                    <input 
                        pattern="\S+@\S+" 
                        type="email" 
                        placeholder="Email" 
                        onChange={ (event) => {recordEmail(event)}}                            
                    />
                    {
                        usedEmailExc ? 
                            <label className="name">Such email is already used</label> 
                            : 
                            email === null ?
                                <label className="name">Incorrect input text</label>
                                :
                                null
                    }
                    <input 
                        pattern="^(\+)?([0-9]){10,14}$" 
                        id="numbers" 
                        type="number" 
                        placeholder="Phone Number" 
                        onChange={ (event) => {recordPhone(event)}}                            
                    />
                    {phone === null && <label className="name">Incorrect input text</label>}
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
                    <p className="password-tips">
                        The password has to be at least at least 1 letter, 1special symbol, 1 number
                    </p>
                </form>
                <div className="register-btn">
                    <button type="button" onClick={ () => {registerUser()}}>Register</button>          
                </div>
            </div>
            <div className="redirectLogin">
                <h5>
                    I already have an account,   
                    <span className="login" onClick={() => {dispatch(changeLogStatus(true)); dispatch(changeRegStatus(false)) }}>
                        Log In
                    </span>
                </h5>
            </div>
        </div>
        ,
        portal
    )
}

export default Register;