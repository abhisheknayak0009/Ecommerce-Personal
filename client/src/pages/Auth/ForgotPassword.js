import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import "../../styles/LoginRegisterStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email,newPassword, answer
            });

            if(res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
  return (
    <Layout title='Forgot Password - Ecommerce App'>
      <div className='register'>
        <div className="register-login">
            <div className="register-login-wrapper">
                <div className="login-banner" style={{backgroundImage: 'url(images/Forgot-password-BANNER.jpg)'}}>
                    <span className="login-banner-title">
                        Forgot Password
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
                        <input className="input-box "type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="inputPassword" aria-describedby="passowordHelp" placeholder='Enter your Password' required />
                        <span className="focus-input" />
                    </div>
                    <div className="input-wrapper validate-input m-b-18 alert-validate" data-validate="Security Question is required">
                        <span className="input-label">Security Question</span>
                        <input className="input-box "type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} id="inputAnswer" aria-describedby="answerHelp" placeholder='Enter your Answer' required />
                        <span className="focus-input" />
                    </div>
                    <div className="login-button-wrapper">
                        <button  type="submit" className="login-button">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword