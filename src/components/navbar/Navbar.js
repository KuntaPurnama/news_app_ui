import styles from "./Navbar.module.css";
import {useHistory} from "react-router-dom";

const Navbar = () => {
  const history = useHistory()

  const handleClick = (route) => {
    history.push(route)
  }

  return (
      <>
        <nav className={styles.navbar}>
          <div className={styles.navbarMenu}>
            <button className={styles.navbarButton} onClick={() => handleClick('/test')}>RESEARCH TOPICS</button>
            <button className={styles.navbarButton} onClick={() => handleClick('/')}>ALL PUBLICATIONS</button>
            <button className={styles.navbarButton} onClick={() => handleClick('/')}>METHOD</button>
            <button className={styles.navbarButton} onClick={() => handleClick('/')}>SHORT READS</button>
            <button className={styles.navbarButton} onClick={() => handleClick('/')}>SHORT READS</button>
            <button className={styles.navbarButton} onClick={() => handleClick('/')}>EXPERT</button>
            <button className={styles.navbarButton} onClick={() => handleClick('/')}>ABOUT</button>
          </div>
        </nav>
        <hr/>
      </>

  );
};

export default Navbar;
