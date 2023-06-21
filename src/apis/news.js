import {
  ACTIVATE_ACCOUNT, FORGOT_PASSWORD,
  GET_ALL_TOPICS,
  GET_MORE_NEWS,
  GET_NEWS_WITH_TOPIC,
  GET_SEARCHED_NEWS, IS_LOGGED_IN, LOGIN, LOGOUT,
  NEWS_SUMMARY, REGISTER, RESET_FORGOT_PASSWORD, RESET_PASSWORD,
  THIS_WEEK_NEWS, UPDATE_USER, VALIDATE_RESET_PASSWORD_TOKEN
} from "../api";
import axios from "./axios";

export function getNewsSummary(index, size){
  return axios.get(NEWS_SUMMARY(index, size));
}

export function getThisWeekNews(size){
  return axios.get(THIS_WEEK_NEWS(size));
}

export function getMoreNews(size){
  return axios.get(GET_MORE_NEWS(size));
}

export function getAllTopics(){
  return axios.get(GET_ALL_TOPICS);
}

export function getNewsWithTopic(body){
  return axios.post(GET_NEWS_WITH_TOPIC, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}


export function searchNews(body){
  return axios.post(GET_SEARCHED_NEWS, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function login(body){
  return axios.post(LOGIN, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function register(body){
  return axios.post(REGISTER, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function logout(body){
  return axios.post(LOGOUT, body);
}

export function activateAccount(token){
  return axios.post(ACTIVATE_ACCOUNT(token));
}

export function isLoggedIn(token){
  return axios.get(IS_LOGGED_IN(token));
}

export function forgotPassword(body){
  return axios.post(FORGOT_PASSWORD, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function validateForgotPasswordToken(body){
  return axios.post(VALIDATE_RESET_PASSWORD_TOKEN, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function resetPassword(body){
  return axios.post(RESET_PASSWORD, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function resetForgotPassword(body){
  return axios.post(RESET_FORGOT_PASSWORD, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}

export function updateUser(body){
  return axios.post(UPDATE_USER, body, {
    headers: {
      'Content-Type' : 'application/json',
    }
  });
}