import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import toast from 'react-hot-toast';
import "../../styles/LoginRegisterStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name, email, password, phone, address, answer
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
    <Layout title='Register - Ecommerce App'>
        <div className='register'>
            <div className="register-login">
                <div className="register-login-wrapper">
                    <div className="login-banner" style={{backgroundImage: 'url(images/Ecommerce_1.png)'}}>
                        <span className="login-banner-title">
                            Register
                        </span>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-wrapper validate-input m-b-26 alert-validate" data-validate="Name is required">
                            <span className="input-label">Name: </span>
                            <input className="input-box" type="text" value={name} onChange={(e) => setName(e.target.value)} id="inputName" aria-describedby="nameHelp" placeholder='Enter your Name' required />
                            <span className="focus-input" />
                        </div>
                        <div className="input-wrapper validate-input m-b-26 alert-validate" data-validate="Username is required">
                            <span className="input-label">Email ID: </span>
                            <input className="input-box" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail" aria-describedby="emailHelp" placeholder='Enter your Email' required />
                            <span className="focus-input" />
                        </div>
                        <div className="input-wrapper validate-input m-b-18 alert-validate" data-validate="Password is required">
                            <span className="input-label">Password</span>
                            <input className="input-box "type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword" aria-describedby="passowordHelp" placeholder='Enter your Password' required />
                            <span className="focus-input" />
                        </div>

                        <div className="input-wrapper validate-input m-b-26 alert-validate" data-validate="Phone is required">
                            <span className="input-label">Phone: </span>
                            <input className="input-box" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id="inputPhone" aria-describedby="phoneHelp" placeholder='Enter your Phone' required />
                            <span className="focus-input" />
                        </div>
                        <div className="input-wrapper validate-input m-b-26 alert-validate" data-validate="Username is required">
                            <span className="input-label">Address: </span>
                            <input className="input-box" type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="inputAddress" aria-describedby="addressHelp" placeholder='Enter your Address' required />
                            <span className="focus-input" />
                        </div>
                        <div className="input-wrapper validate-input m-b-18 alert-validate" data-validate="Security Question is required">
                            <span className="input-label">Security Question</span>
                            <input className="input-box "type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} id="inputAnswer" aria-describedby="answerHelp" placeholder='What is the maiden name of your mother?' required />
                            <span className="focus-input" />
                        </div>
                        <div className="login-button-wrapper">
                            <button  type="submit" className="login-button">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Register