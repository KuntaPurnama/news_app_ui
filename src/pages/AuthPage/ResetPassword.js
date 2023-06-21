import * as React from "react";
import {useHistory, useParams} from "react-router-dom";
import * as newsApi from "../../apis/news";
import styles from "./Auth.module.css";

const ResetPassword = () => {
    const {email} = useParams();
    const [registerRequest, setRegisterRequest] = React.useState({
        email:email,
        password:'',
        newPassword:'',
        confirmNewPassword: ''
    })

    const history = useHistory();

    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterRequest(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleSubmit = async() => {
        try{
            await newsApi.resetPassword(registerRequest);
            setSuccess(true);
            setErrorMessage('')
            setTimeout(() => history.push('/profile/'), 3000)
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
                        <p>RESET</p>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {success && <p className={styles.successMessage}>Reset Password Success, Redirect to profile page in seconds</p>}
                    <div className={styles.input}>
                        <input name={'password'} onChange={handleChange} type={"password"} placeholder={"old password..."} required/>
                    </div>
                    <div className={styles.input}>
                        <input name={'newPassword'} onChange={handleChange} type={"password"} placeholder={"new password..."} required/>
                    </div>
                    <div className={styles.input}>
                        <input name={'confirmNewPassword'} onChange={handleChange} type={"password"} placeholder={"confirm new password..."} required/>
                    </div>
                    <button className={styles.loginButton} onClick={handleSubmit}> Reset </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;