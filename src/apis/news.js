import {GET_ALL_TOPICS, GET_MORE_NEWS, NEWS_SUMMARY, TEST, THIS_WEEK_NEWS} from "../api";
import axios from "./axios";

export function test() {
  return axios.get(TEST);
}

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
