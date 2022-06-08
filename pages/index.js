import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
export default function Home() {

const router = useRouter();



 const handleClick=(e)=>{
router.push('/PatientInfo')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>HIMS</title>
        <meta name="description" content="HIMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>HIMS !</a>
        </h1>

        <Button  color="error" onClick={handleClick}>Fill Info</Button>
      </main>

    </div>
  )
}
