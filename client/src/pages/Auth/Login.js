import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import "../../styles/LoginRegisterStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,password
            });

            if(res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state ||'/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title='Login - Ecommerce App'>
            <div className='register'>
                <div className="register-login">
                    <div className="register-login-wrapper">
                        <div className="login-banner" style={{backgroundImage: 'url(images/bg-01.jpg)'}}>
                            <span className="login-banner-title">
                                Sign In
                            </span>
                        </div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="input-wrapper validate-input m-b-26 alert-validate" data-validate="Username is required">
                                <span className="input-label">Email ID: </span>
                                <input className="input-box" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail" aria-describedby="emailHelp" placeholder='Enter your Email' required />
                                <span className="focus-input" />
                            </div>
                            <div className="input-wrapper validate-input m-b-18 alert-validate" data-validate="Password is required">
                                <span className="input-label">Password</span>
                                <input className="input-box "type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword" aria-describedby="passowrdHelp" placeholder='Enter your Password' required />
                                <span className="focus-input" />
                            </div>
                            <div className="flex-sb-m w-full p-b-30">
                                <div>
                                    <a className="forgot-password-link" onClick={() => {navigate('/forgot-password')}}>
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <div className="login-button-wrapper">
                                <button  type="submit" className="login-button">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login