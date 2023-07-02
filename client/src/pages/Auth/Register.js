import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,email,password,phone,address
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
            <h1> Register Page </h1>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="inputName" aria-describedby="nameHelp" placeholder='Enter your Name' required/>
                </div>
                <div className="mb-3">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder='Enter your Email' required/>
                </div>
                <div className="mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" aria-describedby="passowrdHelp" placeholder='Enter your Password' required/>
                </div>
                <div className="mb-3">
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="inputPhone" aria-describedby="phoneHelp" placeholder='Enter your Phone' required/>
                </div>
                <div className="mb-3">
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="inputAddress" aria-describedby="addressHelp" placeholder='Enter your Address' required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    </Layout>
  )
}

export default Register