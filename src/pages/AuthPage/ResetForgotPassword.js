import * as React from "react";
import * as newsApi from "../../apis/news";
import styles from "./Auth.module.css";
import {useParams} from "react-router-dom";
import {Circles} from "react-loader-spinner";
import LoadingComponent from "../../components/loading/LoadingComponent";

const ResetForgotPassword = () => {
    const [registerRequest, setRegisterRequest] = React.useState({
        email:'',
        newPassword:'',
        confirmNewPassword: ''
    })

    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const {token} = useParams();

    React.useEffect(() => {
        (async () => {
            await isValidToken();
            setIsLoading(false);
        })();
    }, []);

    const isValidToken = async () => {
        try{
            const body = {
                token: token
            };
            const response = await newsApi.validateForgotPasswordToken(body);
            setRegisterRequest(prevState => ({
                ...prevState,
                ['email'] : response.data.data.email
            }));
            setIsValid(true);
        }catch (e){
            console.error(e.onmessage);
            setIsValid(false);
            setErrorMessage(e.response.data.error);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterRequest(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleSubmit = async() => {
        try{
            await newsApi.resetForgotPassword(registerRequest);
            setSuccess(true);
            setErrorMessage('')
        }catch (e){
            console.error(e.message)
            setErrorMessage(e.response.data.error);
            setSuccess(false);
        }
    }

    if(isLoading){
        return <LoadingComponent/>
    }

    if(!isValid){
        return (
            <div className={styles.container}>
                <p className={styles.containerHeader}>RESET PASSWORD</p>
                <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
                <div className={styles.inputContainer}>
                    <div>
                        <p className={styles.activateAccount}>{errorMessage}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>RESET PASSWORD</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>RESET FORGET PASSWORD</p>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {success && <p className={styles.successMessage}>Reset Password Success, Login With Your New Password</p>}
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

export default ResetForgotPassword;