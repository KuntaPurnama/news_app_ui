import styles from "./Navbar.module.css";
import {FaArrowDown} from "react-icons/fa";
import * as React from "react";
import * as newsApi from "../../apis/news";

const Navbar = () => {
    const [topics, setTopics] = React.useState([]);
    const [showTopics, setShowTopics] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            await loadData();
        })();

        window.addEventListener('resize', checkMobileView)

        return () => {
            window.removeEventListener('resize', checkMobileView)
        }
    }, []);


    const checkMobileView = () => {
        setIsMobile(window.innerWidth <= 480);
    }

    const loadData = async () =>{
        const topicResponse = await newsApi.getAllTopics();
        const topicData = topicResponse.data.data;
        setTopics(topicData);
    }

  return (
      <>
        <nav className={styles.navbar}>
          <div className={styles.navbarMenu}>
            <p style={{position:'relative'}}>
                <a className={styles.navbarText} onClick={() => setShowTopics(!showTopics)}>TOPICS <FaArrowDown style={{width:'15px', height:'15px'}}/></a>
                <div className={styles.topicInfo} style={showTopics ? (isMobile ? {display:'block', position:'relative'} : {display:'block', position:'absolute'}) : {display:'none'}}>
                    <div className={styles.gridTopic} style={isMobile ? {gridTemplateColumns: 'repeat(2, 1fr)'} : {gridTemplateColumns: 'repeat(4, 1fr)'}}>
                        {topics.map(topic => (<a href={`/list/news/${topic}`}>{topic}</a>))}
                    </div>
                </div>
            </p>
            <p><a className={styles.navbarText} href={"/list/top_news/all"}>TOP NEWS</a></p>
            <p><a className={styles.navbarText} href={"/list/news/all"}>ALL PUBLICATIONS</a></p>
            <p><a className={styles.navbarText} href={"/list/most_popular_news/all"}>MOST POPULAR</a></p>
          </div>
        </nav>
        <hr/>
      </>

  );
};

export default Navbar;
