import * as React from "react";
import {useEffect} from "react";
import * as newsApi from "../../apis/news";
import styles from "./MostPopularSectionComponent.module.css"
import moment from "moment";

const MostPopularSectionComponent = () =>{
    const [isLoading, setIsLoading] = React.useState(true);
    const [mostPopularNews, setMostPopularNews] = React.useState({});
    const [reviewNews, setReviewNews] = React.useState({});

    useEffect(()=>{
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    },[isLoading])

    const loadData = async () =>{
        const headlineRes = await newsApi.getNewsSummary('most_popular_news', 9);
        const reviewNewsRes = await newsApi.getNewsSummary('review_article_news', 5);
        const headlineData = headlineRes.data.data;
        const reviewData = reviewNewsRes.data.data;
        setMostPopularNews(headlineData)
        setReviewNews(reviewData)
    }

    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y')
    }

    const generatePopularNewsSection = (news, index) =>{
        return (
            <>
                <div className={styles.popularContent}>
                    <div>
                        <img src={news.imageUrl} style={{width:'250px', height:'150px', marginRight:'20px'}}/>
                    </div>
                    <div className={styles.popularText}>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.source} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={news.newsUrl} className={styles.popularTitle}>{news.title}</a>
                        <p className={styles.popularDescription}>{news.description}</p>
                    </div>
                </div>
                {index < mostPopularNews.length-1 &&<hr style={{width:'95%', marginLeft:'0'}}/>}
            </>

        )
    }

    const generateReviewNewsSection = (review, index) => {
        return (
            <div>
                <div>
                    <img src={review.imageUrl} style={{width:'100%', height:'80%'}}/>
                    <p style={{color: 'rgba(0,0,0,0.6)'}}>{review.source} | {generatePublishedDate(review.publishedDate)}</p>
                    <a href={review.newsUrl} className={styles.reviewTitle}>{review.title}</a>
                </div>
                {index < reviewNews.length-1 &&<hr/>}
            </div>
        )
    }

    if(isLoading){
        return <></>
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.popularContainer}>
                    <div className={styles.sectionText}>
                        Most Popular
                        <hr style={{width:'95%', left:'0', textAlign:'left', justifyContent:'left', marginLeft:'0', border:'1px solid rgba(0,0,0,0.8)'}}/>
                    </div>
                    {mostPopularNews.map((news,index) => generatePopularNewsSection(news, index))}
                </div>
                <div className={styles.reviewContainer}>
                    <div className={styles.sectionText}>
                        Reviews
                        <hr style={{left:'0', textAlign:'left', justifyContent:'left', marginLeft:'0', border:'1px solid rgba(0,0,0,0.8)'}}/>
                    </div>
                    <div style={{display:'flex'}}>
                        <div className={styles.verticalBreakline}></div>
                        <div className={styles.reviewContent}>
                            {reviewNews.map((review, index) => generateReviewNewsSection(review, index))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MostPopularSectionComponent;