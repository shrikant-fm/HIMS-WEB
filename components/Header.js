import { Button } from '@nextui-org/react'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter();
  
    return (
    <div className={styles.header}>
      <Button onClick={() => router.back()} className={styles.backBtn}>
        {'<'} Back
      </Button>
    </div>
  )
}
