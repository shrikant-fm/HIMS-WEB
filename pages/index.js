import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
export default function Home() {

const router = useRouter();



  const routeGenerateSlip=(e)=>{
    router.push('/generate-slip')
  }

  const routeUploadPrescription=(e)=>{
    router.push('/Upload')
  }

  const routePrescriptionReport=(e)=>{
    router.push('/prescription-report')
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

        <Button  color="primary" onClick={routeGenerateSlip} className={styles.menuItems}>Generate Slip</Button>
        <Button  color="primary" onClick={routeUploadPrescription} className={styles.menuItems}>Upload Prescription</Button>
        <Button  color="primary" onClick={routePrescriptionReport} className={styles.menuItems}>Digitize Prescription</Button>
        <Button  color="primary" onClick={() => {}} className={styles.menuItems}>Verify Prescription</Button>
      </main>

    </div>
  )
}
