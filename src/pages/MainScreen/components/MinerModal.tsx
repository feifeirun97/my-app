import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { MinerModalProps } from '../type';
import styles from './index.module.scss'
import CommonTable from './CommonTable';
import { fetchGetMinerHistory } from '../../../services/mainscreen';


const MinerModal = (props: MinerModalProps) => {
  const { open, onModalChange, minerItem } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Services.MainScreen.Res.MinerHistoryItem[]>()


  const handleCancel = () => {
    onModalChange(false);
  };

  const getMinerhistory = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetchGetMinerHistory(id);
      setData(res);
    } catch (e) {
      console.log('err: ', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (minerItem?._id && open) {
      getMinerhistory(minerItem?._id)
    }
  }, [minerItem?._id])

  return (
    <div className={styles.minerModal}>
      <Modal width={950} title={`History of Mi${minerItem?.name?.split(' ')?.[1]}`} open={open} onCancel={handleCancel} getContainer={false} destroyOnClose footer={null} >
        <CommonTable type='minerModal' minerModalData={data} minerModalLoading={loading} />
      </Modal>
    </div>
  );
};

export default MinerModal;