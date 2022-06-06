import { Button } from '@nextui-org/react'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter();

 const handleClick =(e)=>{
  
 } 
  
    return (
    <div className={styles.header}>
      I am Header

      <Button onClick={handleClick}>Back</Button>
    </div>
  )
}
