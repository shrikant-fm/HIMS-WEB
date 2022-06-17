import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { GET_USER_ROLE } from "../graphql/strapi-query";
import Header from "../components/Header";

export default function Home() {

const router = useRouter();
const [userRole, setUserRole] = useState(null)

const { loading: userRoleLoading, data: userRoleData, error: userRoleError } = useQuery(GET_USER_ROLE,{fetchPolicy: "no-cache"})

React.useEffect(() => {
  if (userRoleData) {
    var data = userRoleData.me.role.name;
    console.log(data) }
    setUserRole(data)
  // }else{
  //   alert('Please Login')
  //   router.push('/Login')
  // }
}, [userRoleLoading])


  const routeGenerateSlip=(e)=>{
    router.push('/generate-slip')
  }

  const routeUploadPrescription=(e)=>{
    router.push('/upload-prescription')
  }

  const routePrescriptionReport=(e)=>{
    router.push('/prescription-report')
  }

  const routePrescriptionVerification=(e)=>{
    router.push('/prescription-verification')
  }

  if(userRole === "Generate Slip"){
    return (
      
      <div className={styles.container}>
        <Head>
          <title>HIMS</title>
          <meta name="description" content="HIMS" />
          <link rel="icon" href="/favicon.ico" />
         

        </Head>
        <Header backLabel={'Homepage'}/>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>HIMS !</a>
          </h1>
  
       
          <Button  color="primary" onClick={routeGenerateSlip} className={styles.menuItems}>Generate Slip</Button>
        </main>
  
      </div>
    )
  }else if(userRole === "Upload Prescription"){
    return (
      <div className={styles.container}>
        <Head>
          <title>HIMS</title>
          <meta name="description" content="HIMS" />
          <link rel="icon" href="/favicon.ico" />

        </Head>
  
          <Header backLabel={'Homepage'}/>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>HIMS !</a>
          </h1>
  
       
          
          <Button  color="primary" onClick={routeUploadPrescription} className={styles.menuItems}>Upload Prescription</Button>
          
        </main>
  
      </div>
    )
  }else if(userRole === "Digitize Prescription"){
    return (
      <div className={styles.container}>
        <Head>
          <title>HIMS</title>
          <meta name="description" content="HIMS" />
          <link rel="icon" href="/favicon.ico" />

        </Head>
  
          <Header backLabel={'Homepage'}/>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>HIMS !</a>
          </h1>
          
          <Button  color="primary" onClick={routePrescriptionReport} className={styles.menuItems}>Digitize Prescription</Button>
        </main>
  
      </div>
    )
  }else if(userRole === "Verify Prescription"){
    return (
      <div className={styles.container}>
        <Head>
          <title>HIMS</title>
          <meta name="description" content="HIMS" />
          <link rel="icon" href="/favicon.ico" />

        </Head>
  
          <Header backLabel={'Homepage'}/>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>HIMS !</a>
          </h1>
          
          <Button  color="primary" onClick={routePrescriptionVerification} className={styles.menuItems}>Verify Prescription</Button>
        </main>
  
      </div>
    )
  }
 
}
