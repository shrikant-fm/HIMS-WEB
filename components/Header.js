import { Button } from '@nextui-org/react'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'
import client from '../graphql/apollo-client'

export default function Header({ backLabel }) {
  const router = useRouter();

  function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('token');
    client.clearStore()
    router.push('/Login');
}
  
    return (
    <div className={styles.header}>
      <Button size="sm" onClick={() => router.back()} className={styles.backBtn}>
        {`< Back${backLabel ? ' (' + backLabel + ')' : ''}`}
      </Button>
      
      <Button type='primary' onClick={logout}>
        Logout
      </Button>
    </div>
  )
}
