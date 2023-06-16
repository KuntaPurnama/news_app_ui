import styles from "./HeadlineNewsSectionComponent.module.css"
import moment from "moment"
import * as React from "react";
import * as newsApi from "../../apis/news";

const HeadlineNewsSectionComponent = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [headlineNews, setHeadlineNews] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    }, [isLoading]);

    const loadData = async () => {
        const headlineRes = await newsApi.getNewsSummary('top_news', 5);
        const headlineData = headlineRes.data.data
        setHeadlineNews(headlineData)
    };
    
    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y')
    }

    if(isLoading){
       return <></> 
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.leftContent}>
                <div>
                    <div className={styles.sideNewsContent}>
                        <a href={headlineNews[0].newsUrl} style={{textDecoration:'none', color:'black'}}>
                            <img src={headlineNews[0].imageUrl} style={{width:'250px', height:'180px', objectFit:'cover'}}/>
                            <p className={styles.sideDate}>{headlineNews[0].source} | {generatePublishedDate(headlineNews[0].publishedDate)}</p>
                            <p className={styles.sideTitle}>{headlineNews[0].title}</p>
                        </a>
                        <hr style={{border: '1px solid rgba(0,0,0,0.1)'}}/>
                    </div>
                    <div className={styles.sideNewsContent}>
                        <a href={headlineNews[1].newsUrl} style={{textDecoration:'none', color:'black'}}>
                            <img src={headlineNews[1].imageUrl} style={{width:'250px', height:'180px', objectFit:'cover'}}/>
                            <p className={styles.sideDate}>{headlineNews[1].source} | {generatePublishedDate(headlineNews[1].publishedDate)}</p>
                            <p className={styles.sideTitle}>{headlineNews[1].title}</p>
                        </a>
                    </div>
                </div>
                <div className={styles.verticalBreakline}></div>
            </div>

            <div className={styles.middleContent}>
                <div>
                    <img src={headlineNews[2].imageUrl} style={{width:'100%', height:'50%', objectFit:'cover', cursor:'pointer'}}/>
                    <p className={styles.middleDate}>{headlineNews[2].source} | {generatePublishedDate(headlineNews[1].publishedDate)}</p>
                    <a href={"/"} className={styles.middleTitle}>{headlineNews[2].title}</a>
                    <p className={styles.middleDescription}>{headlineNews[2].description}</p>
                </div>
            </div>

            <div className={styles.rightContent}>
                <div className={styles.verticalBreakline}></div>
                <div>
                    <div className={styles.sideNewsContent}>
                        <a  href={headlineNews[3].newsUrl} style={{textDecoration:'none', color:'black'}}>
                            <img src={headlineNews[3].imageUrl} style={{width:'250px', height:'180px', objectFit:'cover'}}/>
                            <p className={styles.sideDate}>{headlineNews[3].source} | {generatePublishedDate(headlineNews[3].publishedDate)}</p>
                            <p className={styles.sideTitle}>{headlineNews[3].title}</p>
                        </a>
                        <hr style={{border: '1px solid rgba(0,0,0,0.1)'}}/>
                    </div>
                    <div className={styles.sideNewsContent}>
                        <a  href={headlineNews[4].newsUrl} style={{textDecoration:'none', color:'black'}}>
                            <img src={headlineNews[4].imageUrl} style={{width:'250px', height:'180px', objectFit:'cover'}}/>
                            <p className={styles.sideDate}>{headlineNews[4].source} | {generatePublishedDate(headlineNews[4].publishedDate)}</p>
                            <p className={styles.sideTitle}>{headlineNews[4].title}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeadlineNewsSectionComponent;