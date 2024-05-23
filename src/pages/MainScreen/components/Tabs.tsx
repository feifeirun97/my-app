import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.module.scss'
import classNames from 'classnames';
import CommonTable from './CommonTable';

const defaultKey = 'Miners'


const items: TabsProps['items'] = [
  {
    key: 'Miners',
    label: '',
    children: <CommonTable type='miners' />,
  },
  {
    key: 'Asteriods',
    label: '',
    children: <CommonTable type='asteroids' />,
  },
  {
    key: 'Planets',
    label: '',
    children: <CommonTable type='planets' />,
  },
];

const Tab: React.FC = () => {
  const [actKey, setActKey] = useState(defaultKey)
  const onKeyChange = (key: string) => {
    console.log(key);
    setActKey(key)
  };




  const TabLabelBar = () => {
    return <div className={styles.tabBtnWrapper}>
      <div className={classNames(styles.tabBtn, actKey === 'Miners' ? styles.active : '')} onClick={() => onKeyChange('Miners')}>
        <div className={classNames(styles.img, styles.minerBg)}></div>
        <div>Miners</div>
      </div>
      <div className={classNames(styles.tabBtn, actKey === 'Asteriods' ? styles.active : '')} onClick={() => onKeyChange('Asteriods')}>
        <div className={classNames(styles.img, styles.asteriodBg)}></div>
        <div>Asteriods</div>
      </div>
      <div className={classNames(styles.tabBtn, actKey === 'Planets' ? styles.active : '')} onClick={() => onKeyChange('Planets')}>
        <div className={classNames(styles.img, styles.planetBg)}></div>
        <div>Planets</div>
      </div>
    </div >

  }

  return <div className={styles.tabs}>
    <TabLabelBar />
    <Tabs items={items} className={styles.tabComponent} activeKey={actKey} />
  </div>;
}

export default Tab;