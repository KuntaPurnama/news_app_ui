import styles from "./Auth.module.css";
import * as React from "react";
import * as newsApi from "../../apis/news";
import {useParams} from "react-router-dom";
import {Circles} from "react-loader-spinner";
import LoadingComponent from "../../components/loading/LoadingComponent";

const ActivateAccountPage = () =>{
    const [message, setMessage] = React.useState('');
    const {token} = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        (async () => {
            await activateAccount();
            setIsLoading(false);
        })();
    }, []);

    const activateAccount = async () =>{
        try{
            const response = await newsApi.activateAccount(token)
            if(response.data.code == 200){
                setMessage('Account is Active You Can Sign in Now')
            }
        }catch (e){
            console.error(e);
            setMessage('Failed To Activate Account')
        }
    }

    if(isLoading){
        return <LoadingComponent/>
    }


    return (
        <div className={styles.container}>
            <p className={styles.containerHeader}>ACTIVATE ACCOUNT</p>
            <hr style={{border:'1px solid rgba(0,0,0,0.2)'}}/>
            <div className={styles.inputContainer}>
                <div>
                    <p className={styles.activateAccount}>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default ActivateAccountPage;