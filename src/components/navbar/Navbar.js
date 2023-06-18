import styles from "./Navbar.module.css";
import {useHistory} from "react-router-dom";

const Navbar = () => {
  const history = useHistory()

  return (
      <>
        <nav className={styles.navbar}>
          <div className={styles.navbarMenu}>
            <a className={styles.navbarText} href={"/list/top_news/all"}>TOP NEWS</a>
            <a className={styles.navbarText} href={"/list/news/all"}>ALL PUBLICATIONS</a>
            <a className={styles.navbarText} href={"/list/most_popular_news/all"}>MOST POPULAR</a>
          </div>
        </nav>
        <hr/>
      </>

  );
};

export default Navbar;
