import styles from "./Header.module.css"
import * as React from "react";
import {useHistory} from "react-router-dom";
import * as newsApi from "../../apis/news";
import {useCookies} from "react-cookie";
import Cookies from 'js-cookie';
import {Circles} from "react-loader-spinner";
import LoadingComponent from "../loading/LoadingComponent";

const Header = () => {
    const [input, setInput] = React.useState()
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
          }
      }catch (e){
          console.error(e.onmessage);
      }
    }

    const logout = async() => {
        try{
            const body = {token: token}
            await newsApi.logout(body);
            setUser(null);
            history.push("/");
            window.location.reload();
        }catch (e){
            console.error(e.onmessage);
        }

    }

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const submitSearch = () => {
        const data = {'keyword' : input}
        history.push("/search", data)
        window.location.reload();
    }

    if(isLoading){
        return <LoadingComponent/>
    }

    return (
        <>
            <div style={{backgroundColor:'black', width:'100%', marginBottom:'20px'}}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.leftComponent} style={{padding:'10px'}}>
                            <a href={"/"} className={styles.tagLine}>PROVIDE FACT, ACCURATE, AND NEWEST INFORMATION</a>
                        </div>
                        <div className={styles.rightComponent} style={{padding:'10px'}}>
                            {user ?
                                <div>
                                    <a href={"/profile"} className={styles.username}>Hi {user.name} </a>
                                    <a onClick={logout} className={styles.account}>Logout</a>
                                </div>

                                :
                                <a href={"/login"} className={styles.account}>Sign In</a>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.leftComponent}>
                        <a href={"/"} style={{fontSize:'40px', color:'black'}}>Innoscripta News</a>
                    </div>
                    <div className={styles.rightComponent}>
                        <input type={'text'} className={styles.searchInput} onChange={handleInput} placeholder={'Title, Source, Topic, Author......'}/>
                        <button className={styles.searchButton} onClick={submitSearch}>Search</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header