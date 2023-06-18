import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import { createBrowserHistory } from "history";
import TestComponent from "./components/TestComponent";
import Header from "./components/header/Header";
import FooterCompoent from "./components/footer/FooterComponent";
import NewsList from "./pages/NewsPage/NewsList";
import SearchedPage from "./pages/SearchPage/SearchedPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const customHistory = createBrowserHistory();

root.render(
    <BrowserRouter history={customHistory}>
        <Header/>
        <Navbar/>
        <div className="page">
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/list/:index/:topic' component={NewsList} />
                <Route exact path='/search' component={SearchedPage} key={'search'}/>
            </Switch>
        </div>
        <FooterCompoent/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
