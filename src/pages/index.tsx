import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import FormComponente2g from '../components/FormComponente2g';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Liberty Bridge</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/logo.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <div className={styles.leftPanel}>
          <img 
            className={styles.logo} 
            src="https://static-00.iconduck.com/assets.00/bridge-at-night-emoji-2048x2037-xismwh2t.png" 
            alt="Logo" 
          />
          <h1 className={styles.title}>Liberty Bridge</h1>
          <ConnectButton />
        </div>
        <div className={styles.rightPanel}>
          <FormComponente2g />
        </div>
      </main>
    </div>
  );
};

export default Home;
