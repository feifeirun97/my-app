import React, { createContext, useEffect, useState } from 'react'
import styles from './index.module.scss';
import Header from './components/Header';
import Tab from './components/Tabs';
import BG from '././../../assets/imgs/Background.png'
import { io } from 'socket.io-client';
import { ContextData } from './type';
export const Context = createContext<ContextData>({
  dataStore: {},
  loading: true
});


export default function MainScreen() {
  const [dataStore, setDataStore] = useState<Services.MainScreen.Res.TickData>({})
  const [laoding, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const socket = io("wss://asteroids.dev.mediasia.cn");// 替换为你的服务器地址

    setTimeout(() => {
      // 监听从服务器发来的消息
      socket.on('tick', (msg) => {
        // console.log('msg: ', msg);
        setDataStore(msg)
        setLoading(false)
      });
    }, 500)

    // 清理函数，组件卸载时断开连接
    return () => {

      socket.off('tick');
      socket.close()
    };
  }, [])


  return (

    <div className={styles.header}>
      <Header />
      <Context.Provider value={{ dataStore, loading: laoding }}>
        <div className={styles.content}>
          <Tab />
          <div className={styles.rightContent}>
            <div>{dataStore.currentTick} years</div>
            <img src={BG} alt="" />
          </div>

        </div>
      </Context.Provider>
    </div >
  )
}
