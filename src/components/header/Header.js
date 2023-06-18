import styles from "./Header.module.css"
import * as React from "react";
import {useHistory} from "react-router-dom";

const Header = () => {
    const [input, setInput] = React.useState()
    const history = useHistory();

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const submitSearch = () => {
        const data = {'keyword' : input}
        history.push("/search", data)
        window.location.reload();
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.leftComponent}>
                    <a href={"/"}>Innoscripta News</a>
                </div>
                <div className={styles.rightComponent}>
                    <input type={'text'} className={styles.searchInput} onChange={handleInput} placeholder={'Title, Source, Topic, Author......'}/>
                    <button className={styles.searchButton} onClick={submitSearch}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Header