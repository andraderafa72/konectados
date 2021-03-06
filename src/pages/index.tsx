/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/index.module.scss';
import { get, ref, remove } from '@firebase/database';
import { database } from '../services/firebase';

export default function Home() {

  useEffect(() => {
    if(localStorage.getItem('konecta@setup')) toast.success('Obrigado por montar seu PC conosco!');

    async function fetchData() {      
      // const snapshot = await get(ref(database, 'feedbacks/'))
  
      // console.log(snapshot.val());
      // remove(ref(database, 'feedbacks'))
    }
    
    fetchData()
  }, [])

  return (
    <>
    <Head>
      <title>Monte seu PC | Konectados</title>
    </Head>
    <main className={styles.container}>
      <Toaster />
      <div className={styles.pageContent}>
        <h2>Monte seu pc com a <span>konectados</span></h2>
        <p>Crie o <span>setup gamer</span> que você sempre sonhou. Escolha seus componentes pela plataforma e envie para nossa equipe.</p>
        <Link href="/montagem" passHref>
          <button>Monte seu PC</button>
        </Link>
      </div>

      <div className={styles.image}>
        <img src="/background.webp" alt="Jovem jogando em seu computador gamer"/>
      </div>
    </main>
    </>
  )
}
