import { Button } from '@nextui-org/react'
import styles from '../styles/Component-Dropdown.module.css'
import { useRouter } from 'next/router'
import React from 'react'

export default function DropdownCustom({items, handleChange}) {
    const [dropdownItems, setDropdownItems] = React.useState(items)
    React.useEffect(() => {
        setDropdownItems(items)
    }, [items])
    return (
    <div className={styles.header}>
        <div className={styles.label}>Gender</div>
        <select defaultValue="" className={styles.dropdown} onChange={e => handleChange(e.target.value)}>
            <option value="" disabled>--Select--</option>
            {dropdownItems ? dropdownItems.map((item, key) => {
                return (
                    <option value={item} key={key}>{item}</option>
                )
            }) : ''}
        </select>
    </div>
  )
}
