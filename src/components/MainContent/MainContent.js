import React, { useEffect, useState } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import CategoryIcon from "./icons/CategoryIcon";
import "./MainContent.css";
import SortIcon from "./icons/SortIcon";
import CancelIconFunc from "./icons/CancelIcon";
import LikeIcon from "./icons/LikeIcon";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recordProducts, setCountProducts, recordCategoryList } from "../../store/ProductsSlice";
import { changeLoaderStatus } from "../../store/LoaderSlice";
import Loader from "../Loader/Loader";
import UnauthorizedLike from "../UnauthorizedLike/UnauthorizedLike";
import { recordFavourite } from "../../store/FavouriteSlice";


const MainContent = () => {

    const productsList = useSelector(state => state.productList);
    const user = useSelector(state => state.userInfo);
    const loader = useSelector(state => state.loader.loader);
    const favouriteList = useSelector(state => state.favourite.favouriteList);
    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();
    const url = location.pathname.replace("/","");
    const [categoryStatus, setCategoryStatus] = useState(false);
    const [sortStatus, setSortStatus] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [searchStatus, setSearchStatus] = useState(false);
    const [emptySearchResult, setEmptySearchResult] = useState(false);
    const [unAuthLike, setUnAuthLike] = useState(false);
    
    function fetchCategoryItems(itemLimit) {
        const categoryId = productsList.categoryList.find(item => item.name === url);
        dispatch(changeLoaderStatus(true));
        if (categoryId) {
            fetch(`api/categories/${categoryId.id}/products?offset=0&limit=${itemLimit}&sortBy=latest`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => dispatch(recordProducts(data)))
        } else {
            dispatch(recordProducts([]));
        }

    }

    function getCategoryList() {
            fetch(`api/categories`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => dispatch(recordCategoryList(data)));
    }

    function fetchResult(itemLimit){
        dispatch(changeLoaderStatus(true));
        fetch(`api/products?offset=0&limit=${itemLimit}&sortBy=latest`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {dispatch(recordProducts(data));})
    }

    function showdropdown(elementDropDown) {
        if (elementDropDown === "category") {
            setCategoryStatus(!categoryStatus);
        } else if (elementDropDown === "sorting") {
            setSortStatus(!sortStatus);
        }

    }

    function changeProductList() {
        dispatch(setCountProducts(12));
        dispatch(changeLoaderStatus(true));
    }
    
    function stopLoader() {
        setTimeout(() => {
            dispatch(changeLoaderStatus(false));
        },500)
    }

    function sortProducts(sortOption, countLimit) {
        dispatch(changeLoaderStatus(true));
        fetch(`/api/products?offset=0&limit=${parseFloat(countLimit)}&sortBy=${sortOption}`)
        .then(res => res.json())
        .then(data => dispatch(recordProducts(data)))
    }

    function searchProducts( event ) {
        if (event && event.key === "Enter" && searchInput.length < 3) {
            alert("Write more letters to find your dream");
        } else if (event && event.key === "Enter" && searchInput.length >= 3) {
            dispatch(setCountProducts(12));
            fetch(`/api/products/search?keywords=${searchInput}&offset=0&limit=12`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setEmptySearchResult(true);
                }
                dispatch(recordProducts(data))    
            })

            event.target.value = "";
            history.push(`/search?=${searchInput}`)
        } else if (!event && searchInput.length >= 3) {
            fetch(`/api/products/search?keywords=${searchInput}&offset=0&limit=${productsList.countproducts}`)
            .then(res => res.json())
            .then(data => dispatch(recordProducts(data)) )
            
        }
        
    }

    function toggleFavourite(event) {
        const likedProduct = favouriteList && favouriteList.some(favItem => favItem.id === parseInt(event.target.viewportElement.id));
        console.log(likedProduct);
        if (!user.user) {
            setUnAuthLike(true);

        } else if (likedProduct) {
            getFavourite(user.user.token);
            dispatch(changeLoaderStatus(true));
            fetch(`/api/products/${event.target.viewportElement.id}/favorite`,{
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + user.user.token,
                }
            })
            .then(res => res.json())
            .then(data => {console.log(data)}); 
            getFavourite(user.user.token);

        }else if (!likedProduct) {
            dispatch(changeLoaderStatus(true));
            
            fetch(`/api/products/${event.target.viewportElement.id}/favorite`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + user.user.token,
                }
            })
            .then(res => res.json())
            .then(data => {console.log(data)});
            getFavourite(user.user.token);

        }
    }

    function getFavourite(value) {
        fetch(`/api/products/favorites?offset=0&limit=20`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + value,
            }
        })
        .then(res => res.json())
        .then(data => {dispatch(recordFavourite(data))});
    }

    useEffect(() => {
        stopLoader();
    },[favouriteList])
    
    useEffect( () => {
        if(!productsList.products) {
            fetchResult(productsList.countproducts);
            getCategoryList();
            stopLoader();  
        }
    })

    useEffect(() => {
        setEmptySearchResult(false);
        if ( url === "") {
            
            fetchResult(productsList.countproducts);
            stopLoader();
        } else if (url === "popular" || url === "latest") {
            sortProducts(url, productsList.countproducts);
            stopLoader();
        } else if (url.includes("search")) {
            searchProducts();
            stopLoader();
        } else {
            fetchCategoryItems(productsList.countproducts);
            stopLoader();
        }
                
    }, [productsList.countproducts, url])

    const productListContent = productsList.products && productsList.products.map( (element) => {
        const likedProduct = favouriteList && favouriteList.some(favItem => favItem.id === element.id);
        
        return(
            <div className="content-element" key={element.id}>
                <img src={element.picture} alt={element.title}/>
                <div className="content-info-container">
                    <div className="element-info">
                        <h3>{element.title.length >= 20 ? element.title.substring(0,10) + " ...": element.title}</h3>
                        <LikeIcon isFavourite={likedProduct} elementId={element.id} handleClick={(event) => toggleFavourite(event)}/>   
                    </div>
                </div>
                <div className="price-info">
                        <h5>{`$ ${element.price}`}</h5>
                </div>
            </div>
        )
    });

    return (
        <main onClick={(event) => { event.target.className !== "searchInput" && setSearchStatus(false)}}>
            <div className="filters">
                <input 
                    placeholder={ searchStatus ? "Enter item name" : "Search products by name"}
                    className="searchInput" 
                    onClick={() => {setSearchStatus(true)}} 
                    onChange={event => setSearchInput(event.target.value)} 
                    onKeyPress={event => searchProducts(event)} 
                />
                <div className="categoryInput" style={ searchStatus ? {visibility:"hidden"} : null} onClick={() => showdropdown("category")}>
                    <ul id="category-nav">
                        <CategoryIcon />
                        <li className="dropdown">
                            <h5>{ url === "" ? "Choose Category" : url === "popular" || url === "latest" || url.includes("search") ? "Choose Category" : url}</h5>                            
                            <ul style={categoryStatus ? null : {display:"none"}}  id="drop-nav" >
                                <li onClick={() => {changeProductList()}}><Link to="/"> All </Link></li>
                                <li onClick={() => {changeProductList()}}><Link to="/fdasfsa"> No items Category </Link></li>
                                {productsList.categoryList.map( item => {
                                    return(
                                        <li key={item.id} onClick={() => {changeProductList()}}><Link to={`/${item.name}`}> {item.name} </Link></li>
                                    )
                                })}
                            </ul>                            
                        </li>
                        <ArrowIcon />
                    </ul>
                </div>
                <div className="sortingInput" style={ searchStatus ? {visibility:"hidden"} : null} onClick={() => showdropdown("sorting")}>
                    <ul id="sort-nav">
                        <SortIcon />
                        <li className="dropdown">
                            <h5>{url === "popular" || url === "latest"? url : "Sorting"}</h5>
                            <ul style={sortStatus ? null : {display:"none"}} id="sort-drop-nav" >
                                <li onClick={() => changeProductList()}><Link to="/popular">Popular</Link></li>
                                <li onClick={() => changeProductList()}><Link to="/latest">New</Link></li>
                            </ul>
                        </li>
                        {url === "popular" || url === "latest"? <CancelIconFunc /> :  <ArrowIcon />}                        
                    </ul>
                </div>
            </div>
            { loader ? <Loader /> : null}
            { unAuthLike ? <UnauthorizedLike closePopup={(value) => setUnAuthLike(value)}/> : null}
            {  productsList.products && productsList.products.length !== 0 ? 
                <div className="content">
                    { productListContent }
                </div> 
                :
                emptySearchResult ?
                <div className="emptySearchResult">
                    <h5>No Results Found</h5>
                    <p>
                        We did not find any article that matches this search
                        Make sure that the search text is entered correctly
                        Try using other search criteria
                    </p>
                </div>
                :
                <h5 className="emptyCategory">No items in this category yet</h5>
            }
            <div className="moreProductsBtn" style={productsList.products.length === 0 ? {visibility:"hidden"}: null}>
                <button onClick={() => {dispatch(setCountProducts(productsList.countproducts + 12)); dispatch(changeLoaderStatus(true));}}>Load more...</button>
            </div>
        </main>
    )
}

export default MainContent;