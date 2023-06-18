const BASE_URL = process.env.REACT_APP_API_URL;

export const TEST = BASE_URL + "/testR";
export const NEWS_SUMMARY = (index, size) => BASE_URL + "/news-summary/" + index + "/" + size;
export const THIS_WEEK_NEWS = (size) => BASE_URL + "/this-week-news/" + size;
export const GET_MORE_NEWS = (size) => BASE_URL + "/get-more-news/" + size;
export const GET_ALL_TOPICS = BASE_URL + "/get-all-topics";
export const GET_NEWS_WITH_TOPIC =  BASE_URL + "/get-news";
export const GET_SEARCHED_NEWS = BASE_URL + "/search"
