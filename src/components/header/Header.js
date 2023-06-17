import styles from "./Header.module.css"

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.leftComponent}>
                    <div>Innoscripta News</div>
                </div>
                <div className={styles.rightComponent}>
                    <input type={'text'} className={styles.searchInput} placeholder={'Title, Source, Topic, Author......'}/>
                    <button className={styles.searchButton}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Header