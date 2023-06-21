import * as React from "react";
import styles from "./SeeMoreButtonComponent.module.css"

const SeeMoreButtonComponent = (props) => {
    return (
        <div style={{textAlign:'center'}}>
            <a href={props.destination} className={styles.seeMore}> See More</a>
        </div>
    )
}

export default SeeMoreButtonComponent