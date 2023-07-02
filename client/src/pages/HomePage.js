import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/Auth';

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={"Best Offers"}>
        <h1>
            HomePage
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </h1>
    </Layout>
  )
}

export default HomePage