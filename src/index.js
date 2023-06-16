import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { createBrowserHistory } from "history";
import TestComponent from "./components/TestComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
const customHistory = createBrowserHistory();

root.render(
    <BrowserRouter history={customHistory}>
        <Navbar/>
        <div className="page">
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path="/test" component={TestComponent} />
            </Switch>
        </div>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
