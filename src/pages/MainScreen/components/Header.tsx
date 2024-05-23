import React from 'react'
import LOGO from '../../../assets/imgs/logo.svg'
import styles from './index.module.scss'
function Header() {
  return (
    <div className={styles.header}>
      <img src={LOGO} alt="" />
      <span>BACKEND MINER</span>
    </div>
  )
}

export default Header