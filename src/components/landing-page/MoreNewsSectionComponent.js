import * as React from "react";
import * as newsApi from "../../apis/news";
import moment from "moment";
import styles from "./MoreNewsSectionComponent.module.css"
import SeeMoreButtonComponent from "../attribute/SeeMoreButtonComponent";

const MoreNewsSectionComponent = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [news, setNews] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    }, [isLoading]);

    const loadData = async () => {
        const newsResponse = await newsApi.getMoreNews(20);
        const newsResponseData = newsResponse.data.data
        setNews(newsResponseData)
    };

    if(isLoading){
        return <></>
    }

    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y')
    }

    const buildMoreNewsView = (news) =>{
        return (
            <div style={{border:'1px solid rgba(0,0,0,0.2'}}>
                <div style={{padding:'10px'}}>
                    <div>
                        <img src={news.imageUrl} className={styles.gridImage}/>
                    </div>
                    <div>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.source ? news.source : 'News'} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={news.newsUrl} className={styles.title}>{news.title}</a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.sectionText}>
                More News
                <hr style={{left:'0', textAlign:'left', justifyContent:'left', marginLeft:'0', border:'1px solid rgba(0,0,0,0.8)'}}/>
            </div>
            <div className={styles.grid}>
                {news.map((news) => (buildMoreNewsView(news)))}
            </div>
            <SeeMoreButtonComponent/>
        </div>
    )
}

export default MoreNewsSectionComponent