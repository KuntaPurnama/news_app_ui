import * as React from "react";
import styles from "./SearchPage.module.css"
import {useLocation} from "react-router-dom";
import * as newsApi from "../../apis/news";
import moment from "moment";
import MoreNewsSectionComponent from "../../components/more-news/MoreNewsSectionComponent";
import LoadingComponent from "../../components/loading/LoadingComponent";

const SearchedPage = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchedNews, setSearchedNews] = React.useState([]);
    const [mostPopular, setMostPopular] = React.useState([]);
    const [mostRecent, setMostRecent] = React.useState([]);
    const location = useLocation();

    React.useEffect(() => {
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    },[])

    const loadData = async() => {
        const body = {
            'keyword': location.state.keyword
        }
        const searchedNewsResponse = await newsApi.searchNews(body);
        const searchedNewsData = searchedNewsResponse.data.data;

        const mostPopularResponse = await newsApi.getNewsSummary('most_popular_news', 5)
        const mostPopularData = mostPopularResponse.data.data

        const mostRecentNewsResponse = await newsApi.getNewsSummary('news', 5)
        const mostRecentData = mostRecentNewsResponse.data.data

        setSearchedNews(searchedNewsData)
        setMostPopular(mostPopularData)
        setMostRecent(mostRecentData)
    }

    if(isLoading){
        return <LoadingComponent/>
    }

    const buildSearchedNews = (news) => {
        return (
            <>
                <div className={styles.newsContent}>
                    <div className={styles.imageContainer}>
                        <img src={news.imageUrl} className={styles.image}/>
                    </div>
                    <div>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.author} | {news.source ? news.source : 'News'} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={"/"} className={styles.title}>{news.title}</a>
                        <p>{news.description}</p>
                    </div>
                </div>
                <hr/>
            </>
        )
    }

    const buildRightNewsSection = (news) => {
        return (
                <div>
                    <p style={{color:'rgba(0,0,0,0.5)'}}>{news.author} | {news.source} | {generatePublishedDate(news.publishedDate)}</p>
                    <p><a href={news.newsUrl} className={styles.title}>{news.title}</a></p>
                    <hr/>
                </div>
        )
    }

    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y').toString();
    }

    return (
        <div>
            <p className={styles.headLineText}>Search : {location.state.keyword}</p>
            <hr/>
            <div className={styles.firstSection}>
                <div className={styles.leftContent}>
                    {searchedNews.map(news => (buildSearchedNews(news)))}
                </div>
                <div className={styles.verticalBreakline}></div>
                <div className={styles.rightContent}>
                    <div className={styles.sectionHeader}>
                        <p>MOST POPULAR</p>
                    </div>
                    <div>
                        {mostPopular.map(news => (buildRightNewsSection(news)))}
                    </div>
                    <div className={styles.sectionHeader}>
                        <p>MOST RECENT</p>
                    </div>
                    <div>
                        {mostRecent.map(news => (buildRightNewsSection(news)))}
                    </div>
                </div>
            </div>

            <div>
                <MoreNewsSectionComponent/>
            </div>
        </div>
    )
}

export default SearchedPage;