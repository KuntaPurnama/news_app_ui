import * as React from "react";
import * as newsApi from "../../apis/news";
import {useParams} from "react-router-dom";
import styles from "./NewsList.module.css"
import moment from "moment";

const NewsList = () => {
    const [news, setNews] = React.useState([]);
    const [thisWeek, setThisWeek] = React.useState(0);
    const [thisMonth, setThisMonth] = React.useState(0);
    const [thisYear, setThisYear] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [authors, setAuthors] = React.useState([]);
    const [sources, setSources] = React.useState([]);
    const [sourceParam, setSourceParam] = React.useState(null);
    const [timeIntervalParam, setTimeIntervalParam] = React.useState(null);
    const [authorParam, setAuthorParam] = React.useState(null);
    const {topic, index} = useParams();
    const itemsPerPage = 10;
    const totalPages = Math.ceil(news.length / itemsPerPage);
    const [currentPage, setCurrentPage] = React.useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = news.slice(startIndex, endIndex);

    React.useEffect(() => {
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    }, [isLoading]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const loadData = async () => {
        let body = {
            'index' : index ? index : 'news',
            'publishedDate' : timeIntervalParam,
            'author' : authorParam,
            'source' : sourceParam,
            'category' : topic !== 'all'? topic : null
        }

        console.log("body ", body)
        const newsWithTopicResponse = await newsApi.getNewsWithTopic(body);
        const newsData = newsWithTopicResponse.data.data;
        setNews(newsData['documents']);
        setTotal(newsData['total_documents']);

        body = {
            'index' : index ? index : 'news',
            'category' : topic !== 'all'? topic : null
        }

        const aggregateResponse = await newsApi.getNewsWithTopic(body);
        const aggregateData = aggregateResponse.data.data;

        setThisWeek(aggregateData['published_this_week']);
        setThisMonth(aggregateData['published_this_month']);
        setThisYear(aggregateData['published_this_year']);
        setAuthors(aggregateData['authors']);
        setSources(aggregateData['sources']);
    };

    const getStartOfYear = () => {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const formattedStartOfYear = startOfYear.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        return formattedStartOfYear;
    };

    const getStartOfMonth = () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const formattedStartOfMonth = startOfMonth.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        return formattedStartOfMonth;
    };

    const getStartOfWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const startOfWeek = new Date(today.setDate(diff));
        return startOfWeek.toISOString().split('T')[0];
    };

    const generatePublishedDate = (publishedDate) => {
        const date = new Date(publishedDate)
        return moment(date).format('MMMM D, Y').toString();
    }

    const setTimeRange = (timeRange) => {
        if(timeRange === 'thisWeek'){
            return getStartOfWeek();
        }

        if(timeRange === 'thisMonth'){
            return getStartOfMonth();
        }

        return getStartOfYear();
    }

    const getNewsWithParam = async() =>{
        setIsLoading(true);
    }

    const resetParam = () => {
        setSourceParam(null);
        setTimeIntervalParam(null);
        setAuthorParam(null);
        setIsLoading(true);
    }

    const handleSourceChange = (event) => {
        setSourceParam(event.target.value);
    }

    const handleTimeRangeChange = (event) => {
        setTimeIntervalParam(event.target.value);
    }

    const handleAuthorChange = (event) => {
        setAuthorParam(event.target.value);
    }

    const generateNewsContent = (news) => {
        return (
            <>
                <div className={styles.newsContent}>
                    <div className={styles.imageContainer}>
                        <img src={news.imageUrl} className={styles.image}/>
                    </div>
                    <div>
                        <p style={{color: 'rgba(0,0,0,0.6)'}}>{news.author} | {news.source ? news.source : 'News'} | {generatePublishedDate(news.publishedDate)}</p>
                        <a href={"/"} className={styles.title}>{news.title}</a>
                        <p className={styles.description}>{news.description}</p>
                    </div>
                </div>
                <hr/>
            </>
        )
    }

    const convertToConventionalFormat = (str) => {
        if (!str) {
            return '';
        }
        const words = str.toLowerCase().split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const result = capitalizedWords.join(' ');

        return result;
    }

    if(isLoading){
        return <></>
    }


    return (
        <div>
            <p className={styles.topic}>{topic === 'all' ? convertToConventionalFormat(index) : topic }</p>
            <p style={{color:'rgba(0,0,0,0.5)'}}>Displaying 1 - 10 of {total} results</p>
            <hr/>
            <div className={styles.container}>
                <div className={styles.news}>
                    {currentItems.map(news => (generateNewsContent(news)))}
                </div>
                <div className={styles.verticalBreakline}></div>
                <div className={styles.filter}>
                    <div className={styles.filterHeader}>
                        <p>FILTER YOUR RESULT</p>
                    </div>

                    <div className={styles.filterTimeRange}>
                        <p style={{fontWeight:'bold'}}>Time Range</p>
                        <select value={timeIntervalParam} className={styles.dropdown} onChange={handleTimeRangeChange}>
                            <option value={null}>Select Time Range...</option>
                            <option value={setTimeRange('thisWeek')}>This Week ({thisWeek})</option>
                            <option value={setTimeRange('thisMonth')}>This Month ({thisMonth})</option>
                            <option value={setTimeRange('thisYear')}>This Year ({thisYear})</option>
                        </select>
                    </div>
                    <hr/>

                    <div>
                        <p style={{fontWeight:'bold'}}>Author</p>
                        <select value={authorParam} className={styles.dropdown} onChange={handleAuthorChange}>
                            <option value={null}>Select Author...</option>
                            {authors.map(author => (<option value={author.key}>{author.key} ({author.doc_count})</option>))}
                        </select>
                    </div>
                    <br/>
                    <hr/>

                    <div>
                        <p style={{fontWeight:'bold'}}>Source</p>
                        <select value={sourceParam} className={styles.dropdown} onChange={handleSourceChange}>
                            <option value={null}>Select Source....</option>
                            {sources.map(source => (<option value={source.key}>{source.key} ({source.doc_count})</option>))}
                        </select>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button className={styles.updateButton} onClick={getNewsWithParam}>UPDATE</button>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button className={styles.resetButton} onClick={resetParam}>RESET ALL</button>
                    </div>
                </div>
            </div>
            <div className={styles.pageButtonContainer}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        className={styles.pageButton}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default NewsList;