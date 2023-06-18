import * as React from "react";
import * as newsApi from "../../apis/news";
import styles from "./ThisWeekNewsSectionComponent.module.css"
import moment from "moment";
import SeeMoreButtonComponent from "../attribute/SeeMoreButtonComponent";

const ThisWeekNewsSectionComponent = () =>{
    const [isLoading, setIsLoading] = React.useState(true);
    const [thisWeekNews, setThisWeekNews] = React.useState({});
    const isMobile = window.innerWidth <= 800;

    React.useEffect(()=>{
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    },[isLoading])

    const loadData = async () =>{
        const thisWeekNewsResponse = await newsApi.getThisWeekNews(4);
        const thisWeekNewsData = thisWeekNewsResponse.data.data;
        setThisWeekNews(thisWeekNewsData);
    }

    if(isLoading){
        return <></>
    }

    const restData = thisWeekNews.slice(1, thisWeekNews.length);

    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y')
    }

    const buildRestThisWeekNews = (news, index) => {
        return (
            <>
                <div className={styles.restThisWeekNews}>
                    <div>
                        <img src={news.imageUrl} className={styles.recentImage}/>
                    </div>
                    <div style={{marginTop:'0'}}>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.source ? news.source: 'News'} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={news.newsUrl} className={styles.restThisWeekNewsTitle}>{news.title}</a>
                        <p className={styles.restThisWeekNewsDescription}>{news.description}</p>
                    </div>
                </div>
                {index < restData.length-1 && <hr/>}
            </>
        )
    }

    return (
        <div className={styles.thisWeekContainer}>
            <div className={styles.sectionText}>
                This Week
                <hr style={{left:'0', textAlign:'left', justifyContent:'left', marginLeft:'0', border:'1px solid rgba(0,0,0,0.8)'}}/>
            </div>
            <div className={styles.thisWeekContent}>
                <div className={styles.thisWeekHighlighted}>
                    <div>
                        <img src={thisWeekNews[0].imageUrl} className={styles.highlightedImage}/>
                    </div>
                    <div>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{thisWeekNews[0].source ? thisWeekNews[0].source : 'News'} | {generatePublishedDate(thisWeekNews[0].publishedDate)}</p>
                        <a href={thisWeekNews[0].newsUrl} className={styles.thisWeekNewsTitle}>{thisWeekNews[0].title}</a>
                        <p className={styles.thisWeekNewsDescription}>{thisWeekNews[0].description}</p>
                    </div>
                </div>

                {!isMobile && <div className={styles.verticalBreakline}></div>}

                <div className={styles.restThisWeekNewsContainer}>
                    {restData.map((news, index) => (buildRestThisWeekNews(news,index)))}
                </div>
            </div>

            <SeeMoreButtonComponent/>
        </div>
    )
}

export default ThisWeekNewsSectionComponent