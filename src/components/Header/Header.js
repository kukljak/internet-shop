import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Registration/Register";
import BasketIcon from "./icons/BasketIcon";
import FavouriteIcon from "./icons/FavouriteIcon";
import RectangleIcon from "./icons/RectangleIcon";
import ArrowIcon from "./icons/ArrowIcon";
import "./Header.css"
import Logo from "./icons/Logo";
import { useDispatch, useSelector } from "react-redux";
import { setCountProducts } from "../../store/ProductsSlice";
import { changeLogStatus, changeRegStatus } from "../../store/AuthSlice";
import { recordUser } from "../../store/UserSlice";
import { changeLoaderStatus } from "../../store/LoaderSlice";
import { recordFavourite } from "../../store/FavouriteSlice";



const Header = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth);
    const user = useSelector(state => state.userInfo.user);

    const [name, setName] = useState();
    const [initials, setInitials] = useState();
    const [userMenuStatus, setUserMenuStatus] = useState(false);

    function getInitials () {
        let name = user.account.fullName.split(" ");
  
        if(name.length > 1) {
            name = name.shift().charAt(0) + name.pop().charAt(0);
        } else {
            name = name[0].substring(0, 2);
        }
        
        setInitials(name.toUpperCase());
    }

    function getName() {
        setName(user.account.fullName.split(" ").slice(0, 1));
    }

    function logOut() {
        dispatch(recordUser("")); 
        setUserMenuStatus(!userMenuStatus); 
        dispatch(changeLoaderStatus(true));
        dispatch(recordFavourite(""));
    }

    useEffect(() => {
        if (user ) {
            getInitials();
            getName();
        }
        dispatch(changeLoaderStatus(false));
    },[user])

    return (
        <>
        <header>
            <div className="logo" onClick={() => {dispatch(setCountProducts(12))}}>
                <Link to="/">
                <Logo />
                </Link>
            </div>
            <div className="navigation">
                <FavouriteIcon />
                <BasketIcon />
                {
                    user ?
                        <>
                            <div className="loged-user" onClick={ () => setUserMenuStatus(!userMenuStatus)}>
                                <h5>{`Welcome ${name}!`}</h5>
                                <div className="initials-circle">
                                    <h5>{initials}</h5>
                                </div>
                                <ArrowIcon />
                            </div>
                            <li className="user-dropdown"> 
                                    <ul style={userMenuStatus ? null : {display:"none"}}  id="user-drop-nav" >
                                        <div className="user-details">
                                            <h5>{user.account.fullName}</h5>
                                            <h6>{user.account.email}</h6>
                                        </div>
                                        <li > Settings </li>
                                        <li onClick={ () => logOut()}> Logout </li>
                                    </ul>                            
                                </li>
                        </> 
                        :
                        <div className="regLogbox">
                            <h1 onClick={() => dispatch(changeRegStatus(true))}>
                                Register
                            </h1>
                            <RectangleIcon />
                            <h1 onClick={() => dispatch(changeLogStatus(true))}>
                                Login
                            </h1>
                        </div>
                }
            </div>
        </header>
        {authStatus.regStatus && <Register />}
        {authStatus.loginStatus && <Login />}
        </>
    )
}

export default Header;