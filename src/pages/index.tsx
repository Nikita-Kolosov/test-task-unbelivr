import type { NextPage } from 'next';
import Head from 'next/head';
import Form from '../components/Form';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Form />
    </>
  );
};

export default Home;
