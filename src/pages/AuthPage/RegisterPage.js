import * as React from "react";
import * as newsApi from "../../apis/news";
import styles from "./Auth.module.css";

const RegisterPage = () => {
    const [registerRequest, setRegisterRequest] = React.useState({
        email:'',
        password:'',
        name:'',
        confirmPassword: ''
    })

    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterRequest(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleRegister = async() => {
        try{
            await newsApi.register(registerRequest);
            setSuccess(true);
            setErrorMessage('')
        }catch (e){
            console.error(e.message)
            setErrorMessage(e.response.data.error);
            setSuccess(false);
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>CREATE ACCOUNT</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>SIGN UP</p>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {success && <p className={styles.successMessage}>We Already Sent You Email To Activate Your Account</p>}
                    <div className={styles.input}>
                        <input name={'name'} onChange={handleChange} type={"text"} placeholder={"username..."} required/>
                    </div>
                    <div className={styles.input}>
                        <input name={'email'} onChange={handleChange} type={"text"} placeholder={"email..."} required/>
                    </div>
                    <div className={styles.input}>
                        <input name={'password'} onChange={handleChange} type={"password"} placeholder={"password..."} required/>
                    </div>
                    <div className={styles.input}>
                        <input name={'confirmPassword'} onChange={handleChange} type={"password"} placeholder={"confirm password..."} required/>
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

export default RegisterPage;