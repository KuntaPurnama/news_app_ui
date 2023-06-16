import {NEWS_SUMMARY, TEST} from "../api";
import axios from "./axios";

export function test() {
  return axios.get(TEST);
}

export function getNewsSummary(index, size){
  return axios.get(NEWS_SUMMARY(index, size));
}
