import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
const Spinner = () => {
  const [count, setCounter] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevValue) => --prevValue)
    }, 1000)
    count === 0 && navigate('/login', {
      state: location.pathname
    });
    return () => clearInterval(interval);
  }, [count, navigate, location])
  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
          <h1 className='text-center'>Redirecting you in {count}</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>
  )
}

export default Spinner