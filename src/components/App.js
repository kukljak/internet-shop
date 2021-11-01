import React from "react";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MainContent from './MainContent/MainContent';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const Context = React.createContext();

function App() {
  
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Header />
          <MainContent />
          <Footer />
        </BrowserRouter>
    </Provider>
  );
}

export default App;
