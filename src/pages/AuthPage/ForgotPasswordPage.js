import styles from "./Auth.module.css";
import * as React from "react";
import * as newsApi from "../../apis/news";
import {useHistory} from "react-router-dom";

const ForgotPasswordPage = () => {
    const [resetRequest, setResetRequest] = React.useState({
        email:''
    })

    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const history = useHistory();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setResetRequest(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleSubmit = async() => {
        try{
            await newsApi.forgotPassword(resetRequest);
            setSuccess(true);
            setErrorMessage('')
            setInterval(() => history.push('/login'), 3000)
        }catch (e){
            console.error(e.message)
            setErrorMessage(e.response.data.error);
            setSuccess(false);
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>RESET PASSWORD</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>FORGOT PASSWORD</p>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {success && <p className={styles.successMessage}>We Already Sent You Email To Reset Your Password</p>}
                    <div className={styles.input}>
                        <input name={'email'} onChange={handleChange} type={"text"} placeholder={"email..."} required/>
                    </div>
                    <button className={styles.loginButton} onClick={handleSubmit}> Submit </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;