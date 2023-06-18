import * as React from "react";
import * as newsApi from "../../apis/news";
import styles from "./MostRecentSectionComponent.module.css"
import moment from "moment";
import SeeMoreButtonComponent from "../attribute/SeeMoreButtonComponent";

const MostRecentSectionComponent = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [mostRecentNews, setMostRecentNews] = React.useState({});
    const isMobile = window.innerWidth <= 800;

    React.useEffect(()=>{
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    },[isLoading])

    const loadData = async () =>{
        const mostRecentResponse = await newsApi.getNewsSummary('news', 5);
        const mostRecentData = mostRecentResponse.data.data;
        setMostRecentNews(mostRecentData);
    }

    if(isLoading){
        return <></>
    }

    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y')
    }

    const restData = mostRecentNews.slice(1, mostRecentNews.length);

    const buildRestOfRecentNews = (news, index) =>{
        return (
            <>
                <div className={styles.recentNews} >
                    <div>
                        <img src={news.imageUrl} className={styles.recentImage}/>
                    </div>
                    <div>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.sources ? news.sources : 'News'} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={news.newsUrl} className={styles.recentTitle}>{news.title}</a>
                    </div>
                </div>
                {index < restData.length-1 && <div className={styles.verticalBreakline}></div>}
            </>
        )

    }

    return (
        <div>
            <div className={styles.sectionText}>
                Recently Published
                <hr style={{left:'0', textAlign:'left', justifyContent:'left', marginLeft:'0', border:'1px solid rgba(0,0,0,0.8)'}}/>
            </div>
            <div className={styles.highlightedContainer}>
                {isMobile ? (
                    <>
                        <div className={styles.highlightedImage}>
                            <img src={mostRecentNews[0].imageUrl} className={styles.image}/>
                        </div>
                        <div className={styles.highlightedNews}>
                            <p style={{color: 'rgba(0,0,0,0.6)'}}>{mostRecentNews[0].source} | {generatePublishedDate(mostRecentNews[0].publishedDate)}</p>
                            <a href={mostRecentNews[0].newsUrl} className={styles.highlightedTitle}>{mostRecentNews[0].title}</a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.highlightedNews}>
                            <p style={{color: 'rgba(0,0,0,0.6)'}} className={styles.highlightedDate}>{mostRecentNews[0].source} | {generatePublishedDate(mostRecentNews[0].publishedDate)}</p>
                            <a href={mostRecentNews[0].newsUrl} className={styles.highlightedTitle}>{mostRecentNews[0].title}</a>
                            <p className={styles.highlightedDescription}>{mostRecentNews[0].description}</p>
                        </div>
                        <div className={styles.highlightedImage}>
                            <img src={mostRecentNews[0].imageUrl} className={styles.image}/>
                        </div>
                    </>
                )}

            </div>
            <div className={styles.recentContainer}>
                {restData.map((news, index) => buildRestOfRecentNews(news,index))}
            </div>
            <SeeMoreButtonComponent/>
        </div>
    )
}

export default MostRecentSectionComponent;