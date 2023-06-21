import * as React from "react";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import * as newsApi from "../../apis/news";
import styles from "./ProfilePage.module.css";
import {Circles} from "react-loader-spinner";
import LoadingComponent from "../../components/loading/LoadingComponent";

const ProfilePage = () =>{
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const history = useHistory();
    const token = Cookies.get('token');
    const [updateRequest, setUpdateRequest] = React.useState({
        email: '',
        name: ''
    });

    const [errorMessage, setErrorMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            await isLoggedInUser();
            setIsLoading(false);
        })();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdateRequest(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleUpdate = async () =>{
        try{
            console.log('update', updateRequest);
            await newsApi.updateUser(updateRequest);
            setErrorMessage('')
            setSuccess(true);
            setTimeout(()=> setSuccess(false), 4000)
        }catch (e){
            console.error(e.message)
            setSuccess(false);
            setErrorMessage(e.response.data.error);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000)
        }
    }

    const isLoggedInUser = async () => {
        try{
            if(token){
                const response = await newsApi.isLoggedIn(token)
                setUser(response.data.data);
                setUpdateRequest({
                    email: response.data.data.email,
                    name: response.data.data.name,
                })
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
        return <LoadingComponent/>
    }

    const changePasswordHandle = () =>{
        history.push("/reset-password/" + user.email)
    }

    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>USER PROFILE</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div className={styles.content}>
                    {success && <p className={styles.successMessage}>Update User Success</p>}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    <div className={styles.header}>
                        <p>Username</p>
                    </div>
                    <input className={styles.profileInput} defaultValue={user.name} name={'name'} onChange={handleChange} type={"text"} placeholder={"username..."} required/>
                    <div className={styles.header}>
                        <p>Email</p>
                    </div>
                    <input className={styles.profileInput} defaultValue={user.email} name={'email'} onChange={handleChange} type={"text"} placeholder={"email...."} disabled required/>
                    <div className={styles.header}>
                        <p>Password</p>
                    </div>
                    <input className={styles.profileInput} defaultValue={'***********'} name={'email'} onChange={handleChange} type={"text"} placeholder={"email...."} disabled required/>
                    <div style={{marginBottom:'20px'}}>
                        <button className={styles.resetPassword} onClick={changePasswordHandle} > Change Password </button>
                    </div>

                    <button className={styles.loginButton} onClick={handleUpdate} > Save </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;