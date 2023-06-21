import {Circles} from "react-loader-spinner";
import * as React from "react";

const LoadingComponent = () =>{
    return <>
        <div style={{display:"flex", justifyContent:"center"}}>
            <Circles
                type="Puff"
                color="black"
                height={100}
                width={100}
                timeout={3000} // Set a timeout if needed
            />
        </div>
    </>
}

export default LoadingComponent;