const BASE_URL = process.env.REACT_APP_API_URL;

export const NEWS = BASE_URL + "/news";
export const NEWS_SUMMARY = (index, size) => NEWS + "/news-summary/" + index + "/" + size;
export const THIS_WEEK_NEWS = (size) => NEWS + "/this-week-news/" + size;
export const GET_MORE_NEWS = (size) => NEWS + "/get-more-news/" + size;
export const GET_ALL_TOPICS = NEWS + "/get-all-topics";
export const GET_NEWS_WITH_TOPIC =  NEWS + "/get-news";
export const GET_SEARCHED_NEWS = NEWS + "/search"

export const AUTH = BASE_URL + "/auth";
export const LOGIN = AUTH + "/login";
export const REGISTER = AUTH + "/register";
export const FORGOT_PASSWORD = AUTH + "/forgot-password";
export const VALIDATE_RESET_PASSWORD_TOKEN = AUTH + '/validate-reset-password';
export const RESET_PASSWORD = AUTH + '/reset-password';
export const RESET_FORGOT_PASSWORD = AUTH + '/reset-forgot-password';
export const LOGOUT = AUTH + "/logout";
export const ACTIVATE_ACCOUNT = (token) => AUTH + "/activate-account/" + token;
export const IS_LOGGED_IN = (token) => AUTH + "/is-logged-in/" + token;

export const USER = BASE_URL + "/user";
export const UPDATE_USER = USER + "/update";

