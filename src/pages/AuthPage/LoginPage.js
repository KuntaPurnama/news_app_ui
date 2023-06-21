import * as React from "react";
import * as newsApi from "../../apis/news";
import styles from "./Auth.module.css";
import {useHistory} from "react-router-dom";

const LoginPage = () => {
    const [loginRequest, setLoginRequest] = React.useState({
        email:'',
        password:''
    })

    const [error, setError] = React.useState('');
    const history = useHistory();


    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginRequest(prevState => ({
            ...prevState,
            [name] : value
        }));
    }


    const handleLogin = async() => {
        try{
            const response = await newsApi.login(loginRequest);
            if(response.data.code == 200){
                history.push("/");
                window.location.reload();
            }
        }catch (e){
            // window.location.reload();
            setError(e.response.data.error);
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>PROFILE</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>SIGN IN</p>
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.input}>
                        <input name={'email'} onChange={handleChange} type={"text"} placeholder={"email..."} required/>
                    </div>
                    <div className={styles.input}>
                        <input name={'password'} onChange={handleChange} type={"password"} placeholder={"password..."} required/>
                    </div>
                    <button className={styles.loginButton} onClick={handleLogin}> Login </button>

                    <div className={styles.linkContainer}>
                        <p>
                            <a href={"/forgot-password"} className={styles.link}>Forgot Password</a>
                        </p>
                        <p>
                            <a href={"/register"} className={styles.link}>Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;