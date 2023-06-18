import styles from "./FooterComponent.module.css"
import * as React from "react";
import * as newsApi from "../../apis/news";
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube} from "react-icons/fa";

const FooterCompoent = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [topics, setTopics] = React.useState([]);

    React.useEffect(()=>{
        (async () => {
            await loadData();
            setIsLoading(false);
        })();
    },[isLoading])

    const loadData = async () =>{
        const topicResponse = await newsApi.getAllTopics();
        const topicData = topicResponse.data.data;
        setTopics(topicData);
    }

    if(isLoading){
        return <></>
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.webInfo}>
                    <p className={styles.webName}>Innoscripta News</p>
                    <p className={styles.webAddress}>1945 Soekarno St, West Jakarta, Indonesia, 11920</p>
                    <p className={styles.webAddress}>(+62) 219-2932-2322</p>
                    <p className={styles.webAddress}>(+62) 210-5232-9002</p>
                </div>
                <div className={styles.topicInfo}>
                    <p className={styles.sectionTitle}>TOPICS</p>
                    <hr style={{width:'90%', marginLeft:'0'}}/>
                    <div className={styles.gridTopic}>
                        {topics.map(topic => (<a href={`/list/news/${topic}`}>{topic}</a>))}
                    </div>
                </div>
                <div className={styles.socialMedia}>
                    <p className={styles.sectionTitle}>FOLLOW US</p>
                    <hr/>
                    <p><a href={"/"} className={styles.socialMediaLink}><FaInstagram/> Instagram</a></p>
                    <p><a href={"/"} className={styles.socialMediaLink}><FaFacebook/> Facebook</a></p>
                    <p><a href={"/"} className={styles.socialMediaLink}><FaTwitter/> Twitter</a></p>
                    <p><a href={"/"} className={styles.socialMediaLink}><FaLinkedinIn/> LinkedIn</a></p>
                    <p><a href={"/"} className={styles.socialMediaLink}><FaYoutube/> Youtube</a></p>
                </div>
            </div>
        </div>
    )
}

export default FooterCompoent