import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

            if(res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    console.log(process.env.REACT_APP_API)
  return (
    <Layout title='Register - Ecommerce App'>
        <div className='register'>
            <h1> Register Page </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="inputName" className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="inputName" aria-describedby="nameHelp" required/>
                </div>
                <div className="mb-3">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" aria-describedby="nameHelp" required/>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" required/>
                </div>
                <div className="mb-3">
                    <label for="inputPhone" className="form-label">Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="inputPhone" aria-describedby="nameHelp" required/>
                </div>
                <div className="mb-3">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="inputAddress" aria-describedby="nameHelp" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </Layout>
  )
}

export default Register