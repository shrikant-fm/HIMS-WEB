import { Button } from '@nextui-org/react'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'

export default function Header({ backLabel }) {
  const router = useRouter();
  
    return (
    <div className={styles.header}>
      <Button size="sm" onClick={() => router.back()} className={styles.backBtn}>
        {`< Back${backLabel ? ' (' + backLabel + ')' : ''}`}
      </Button>
    </div>
  )
}
