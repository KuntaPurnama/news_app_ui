import * as React from "react";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import * as newsApi from "../../apis/news";
import styles from "../AuthPage/Auth.module.css";

const Profile = () =>{
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const history = useHistory();
    const token = Cookies.get('token');

    React.useEffect(() => {
        (async () => {
            await isLoggedInUser();
            setIsLoading(false);
        })();
    }, []);

    const isLoggedInUser = async () => {
        try{
            if(token){
                const response = await newsApi.isLoggedIn(token)
                setUser(response.data.data);
                setIsLoading(false);
            }else{
                history.push("/login")
            }
        }catch (e){
            history.push("/login")
            console.error(e.onmessage);
        }
    }

    if(isLoading){
        return <></>
    }

    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>CREATE ACCOUNT</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>PROFILE</p>
                    </div>
                    <div className={styles.input}>
                        <p>{user.name}</p>
                    </div>
                    <div className={styles.input}>
                        <p>{user.email}</p>
                    </div>
                    <div className={styles.input}>
                        <p></p>
                    </div>
                    <div className={styles.input}>
                        <input name={'confirmPassword'} onChange={handleChange} type={"password"} placeholder={"password..."} required/>
                    </div>
                    <button className={styles.loginButton} onClick={handleRegister}> Register </button>

                    <div className={styles.linkContainer}>
                        <p>
                            Already Have Account ? <a href={"/login"} className={styles.link}>Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;