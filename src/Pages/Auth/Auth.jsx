/* eslint-disable no-unused-vars */
// import React from 'react'
import classes from "./auth.module.css"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { auth } from '../../Utility/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from "../../components/DataProvider/DataProvidere"
import { Type } from '../../Utility/action.type'
import { PuffLoader } from 'react-spinners'
import { useNavigate, useLocation } from 'react-router-dom'

const Auth = () => {
    const navigate = useNavigate()
    const navStateData = useLocation()
    const [{ user }, dispatch] = useContext(DataContext)
    // console.log(user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState({
        signIn: false,
        signUp: false
    })




    // console.log(email, password);

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(e.target.name);

        if (e.target.name === 'signin') {
            setLoading({
                ...loading,
                signIn: true
            })
            signInWithEmailAndPassword(auth, email, password)
                .then((userInfo) => {
                    dispatch({
                        type: Type.SET_USER,
                        user: userInfo.user
                    })
                    setLoading({
                        ...loading,
                        signIn: false
                    })
                    navigate(navStateData?.state?.redirect || '/');
                    // Signed in
                    // const user = userInfo.user;
                    // ...
                })
                .catch((error) => {
                    setError(error.message)
                    setLoading({
                        ...loading,
                        signIn: false
                    })
                });
        }
        else {
            setLoading({
                ...loading,
                signUp: true
            })
            createUserWithEmailAndPassword(auth, email, password)
                .then((userInfo) => {
                    dispatch({
                        type: Type.SET_USER,
                        user: userInfo.user
                    })
                    setLoading({
                        ...loading,
                        signUp: false
                    })
                    navigate(navStateData?.state?.redirect || '/');
                    // Signed in 
                    // const user = userInfo.user;
                    // ...
                })
                .catch((error) => {
                    setError(error.message)
                    setLoading({
                        ...loading,
                        signUp: false
                    })

                });
        }
    }


    return (
        <>
            <div className={classes.login}>
                <Link to={"/"}>
                    <img src="https://i.pinimg.com/736x/fe/54/b9/fe54b93c934495741f58a20cfe6daf6d.jpg   " alt="" />
                </Link>
                <div className={classes.login__Container}>
                    <h1>Sign In</h1>
                    {
                        navStateData?.state?.msg && (
                            <small
                                style={{
                                    padding: "5px",
                                    textAlign: "center",
                                    color: "red",
                                    fontWeight: "bold"
                                }}>
                                {navStateData?.state?.msg}
                            </small>
                        )
                    }
                    <form action="">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input value={email} type="email" id="email" name="" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" name="signin" className={classes.login_btn} onClick={handleLogin}>
                            {loading.signIn ? (<PuffLoader color="#000" size={20} ></PuffLoader>) : ('Sign In')}</button>
                    </form>

                    {/* agreement and new to amazon  */}
                    <p>by signing-in you agree to the Amazon Clone Conditions of Use & Sale.
                        Please see our Privacy Notice, our Cookies Notice and our Interest-Based
                        Ads Notice.
                    </p>
                    <button name="signup" onClick={handleLogin} className={classes.login__register_btn}>
                        {loading.signUp ? (<PuffLoader color="#000" size={20} ></PuffLoader>) : ('Create your Amazon Account')}</button>
                    {error && <small className={classes.error}>{error}</small>}
                </div>
            </div>
        </>
    )
}

export default Auth