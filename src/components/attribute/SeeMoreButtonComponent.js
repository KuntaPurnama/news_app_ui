import * as React from "react";
import styles from "./SeeMoreButtonComponent.module.css"

const SeeMoreButtonComponent = () => {
    return (
        <div style={{textAlign:'center'}}>
            <button className={styles.seeMore}> See More</button>
        </div>
    )
}

export default SeeMoreButtonComponent