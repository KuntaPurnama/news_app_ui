const BASE_URL = process.env.REACT_APP_API_URL;

export const TEST = BASE_URL + "/testR";
export const NEWS_SUMMARY = (index, size) => BASE_URL + "/news-summary/" + index + "/" + size;
