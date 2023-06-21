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
import NewsListPage from "./pages/NewsPage/NewsListPage";
import SearchedPage from "./pages/SearchPage/SearchedPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import ActivateAccountPage from "./pages/AuthPage/ActivateAccountPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ResetForgotPassword from "./pages/AuthPage/ResetForgotPassword";
import ResetPassword from "./pages/AuthPage/ResetPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
const customHistory = createBrowserHistory();

root.render(
    <BrowserRouter history={customHistory}>
        <Header/>
        <Navbar/>
        <div className="page">
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/list/:index/:topic' component={NewsListPage} />
                <Route exact path='/search' component={SearchedPage} key={'search'}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
                <Route exact path='/forgot-password' component={ForgotPasswordPage}/>
                <Route exact path='/activate-account/:token' component={ActivateAccountPage}/>
                <Route exact path='/profile' component={ProfilePage}/>
                <Route exact path='/reset-forgot-password/:token' component={ResetForgotPassword}/>
                <Route exact path='/reset-password/:email' component={ResetPassword}/>
            </Switch>
        </div>
        <FooterCompoent/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
