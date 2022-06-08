import React from 'react'
import { FileUpload } from 'primereact/fileupload';
import styles from '../styles/Home.module.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

export default function Upload() {
  return (
    <div className={styles.container}>
        <main className={styles.main}>
        <FileUpload name="demo" url="./api/upload"></FileUpload>
        </main>
        
    </div>
  )
}
 