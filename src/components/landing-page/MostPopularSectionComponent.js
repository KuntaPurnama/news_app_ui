import * as React from "react";
import {useEffect} from "react";
import * as newsApi from "../../apis/news";
import styles from "./MostPopularSectionComponent.module.css"
import moment from "moment";
import SeeMoreButtonComponent from "../attribute/SeeMoreButtonComponent";

const MostPopularSectionComponent = () =>{
    const [isLoading, setIsLoading] = React.useState(true);
    const [mostPopularNews, setMostPopularNews] = React.useState({});
    const [reviewNews, setReviewNews] = React.useState({});
    const isMobile = window.innerWidth <= 800;

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
            <div>
                <div className={styles.popularContent}>
                    <div className={styles.popularImageContainer}>
                        <img src={news.imageUrl} className={styles.popularImage}/>
                    </div>
                    <div>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.source} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={news.newsUrl} className={styles.popularTitle}>{news.title}</a>
                        <p className={styles.popularDescription}>{news.description}</p>
                    </div>
                </div>
                {index < mostPopularNews.length-1 &&<hr/>}
            </div>

        )
    }

    const generateReviewNewsSection = (review, index) => {
        return (
            <>
                <div>
                    <img src={review.imageUrl} style={{width:'100%', height:'auto'}}/>
                    <p style={{color: 'rgba(0,0,0,0.6)'}}>{review.source} | {generatePublishedDate(review.publishedDate)}</p>
                    <a href={review.newsUrl} className={styles.reviewTitle}>{review.title}</a>
                </div>
                {index < reviewNews.length-1 &&<hr/>}
            </>
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
                    <SeeMoreButtonComponent/>
                </div>
                <div className={styles.reviewContainer}>
                    <div className={styles.sectionText}>
                        Reviews
                        <hr style={{marginLeft:'0', border:'1px solid rgba(0,0,0,0.8)'}}/>
                    </div>
                    <div style={{display:'flex'}}>
                        {!isMobile && <div className={styles.verticalBreakline}></div>}
                        <div className={styles.reviewContent}>
                            {reviewNews.map((review, index) => generateReviewNewsSection(review, index))}
                        </div>
                    </div>
                    <SeeMoreButtonComponent/>
                </div>
            </div>
        </>
    )
}

export default MostPopularSectionComponent;