import React, { useContext, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import ADD from '../../../assets/imgs/add-miner.png'
import { Context } from '../index';
import { CommontableProps } from '../type';
import styles from './index.module.scss'
import MinerModal from './MinerModal';
import moment from 'moment';
import CreateMinerModal from './CreateMinerModal';
export const MinerStatus = {
  0: 'Idle',
  1: 'Traveling',
  2: 'Mining',
  3: 'Transfering',
};

export const MinerHistory = {
  0: 'Idle',
  1: 'Miner spawn',
  2: 'Mining',
  3: 'Transfering minerals to planet',
  4: 'Travling back to plaet',
  5: 'Arriver at planet'
}


export const AsteroidColumns: TableColumnsType<Services.MainScreen.Res.AsteroidItem> =
  [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string) => {
        return 'Ast' + name.split(' ')[1];
      },
    },
    {
      title: 'Minerals',
      dataIndex: 'minerals',
      render: (minerals: number) => {
        return minerals === 0 ? <span className={styles.exhausted}>{minerals}</span> : minerals;
      },
    },
    {
      title: 'CurrentMiner',
      dataIndex: 'currentMiner',
      render: (currentMiner: null | Services.MainScreen.Res.MinerItem) => {
        return currentMiner ? 'Mi' + currentMiner.name.split(' ')[1] : 0;
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      render: (position: { x: number; y: number }) =>
        Math.round(position.x).toString() +
        ',' +
        Math.round(position.y).toString(),
    },
  ];




const CommonTable = (props: CommontableProps) => {
  //props
  const { type, minerModalData, minerModalLoading } = props

  // context
  const contextData = useContext(Context)
  const { dataStore, loading } = contextData

  // state
  const [minerModalOpen, setMinerModalOpen] = useState<boolean>(false)
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const [minerRow, setMinerRpw] = useState<Services.MainScreen.Res.MinerItem>()


  //columns
  const PlanetColumns: TableColumnsType<Services.MainScreen.Res.PlanetItem> =
    [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (name: string) => {
          return 'Pl' + name.split(' ')[1];
        },
      },
      {
        title: 'Miners',

        dataIndex: 'miners',
      },
      {
        title: 'Minerals',
        dataIndex: 'minerals',
        render: (minerals: number) => {
          return <span style={{ color: minerals >= 1000 ? '#38d9a9' : '' }}>{minerals}/1000</span>
        },
      },
      {
        title: '',
        dataIndex: 'add',
        width: 210,
        render: (_, row) => {
          let rez = <></>
          if (row.minerals >= 1000) {
            rez = <div className={styles.addWrapper} onClick={() => setCreateModalOpen(true)} >
              <img src={ADD} alt="" className={styles.addImg} />
              Create a miner
            </div>
          }
          return rez
        },
      },
    ];
  const MinerColumns: TableColumnsType<Services.MainScreen.Res.MinerItem> =
    [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (name: string) => {
          return 'Mi' + name.split(' ')[1];
        },
      },
      {
        title: 'Planet',
        dataIndex: 'planet',
        render: (planet: Services.MainScreen.Res.PlanetItem) => {
          return 'Pl' + planet.name.split(' ')[1];
        },
      },

      {
        title: 'carryCapacity',
        dataIndex: 'carryCapacity',
        render: (carryCapacity: number) => {
          return <span style={{ color: carryCapacity == 200 ? '#38d9a9' : '' }}>{carryCapacity}/200</span>
        },
      },
      {
        title: 'travelSpeed',
        dataIndex: 'travelSpeed',
      },
      {
        title: 'miningSpeed',
        dataIndex: 'miningSpeed',
      },
      {
        title: 'Position',
        dataIndex: 'x',
        width: 120,
        render: (_, row: Services.MainScreen.Res.MinerItem) =>
          Math.round(row.x).toString() + ',' + Math.round(row.y).toString(),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 120,
        render: (status: 0 | 1 | 2 | 3) => MinerStatus[status],
      },
    ];



  const MinerModalColumns: TableColumnsType<Services.MainScreen.Res.MinerHistoryItem> =
    [
      {
        title: 'Date',
        dataIndex: 'updatedAt',
        render: (date: string) => moment(date).format('YYYY/MM/DD HH:mm:ss')
      },
      {
        title: 'Year',
        dataIndex: 'year',
      },
      {
        title: 'Planet',
        dataIndex: 'planet',
        render: (planet: string) => {
          return 'Pl' + planet.split(' ')[1];
        },
      },
      {
        title: 'carryCapacity',
        dataIndex: 'capacity',
        render: (_, row) => {
          return <span style={{ color: row.capacity.current == row.capacity.max ? '#38d9a9' : '' }}>{row.capacity.current}/{row.capacity.max}</span>
        },
      },
      {
        title: 'travelSpeed',
        dataIndex: 'speed',
        render: (_, row) => {
          return row.speed.travel
        },
      },
      {
        title: 'miningSpeed',
        dataIndex: 'speed',
        render: (_, row) => {
          return row.speed.mining
        },
      },
      {
        title: 'Position',
        dataIndex: 'position',
        width: 140,
        render: (_, row: Services.MainScreen.Res.MinerHistoryItem) =>
          Math.round(row.position.x).toString() + ',' + Math.round(row.position.y).toString(),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 140,
        render: (status: 0 | 1 | 2 | 3 | 4 | 5) => MinerHistory[status],
      },
    ];

  const TableMap = {
    miners: MinerColumns,
    planets: PlanetColumns,
    asteroids: AsteroidColumns,
    minerModal: MinerModalColumns
  };


  return (
    <div className={styles.commonTable}>
      <Table
        //@ts-ignore
        columns={TableMap[type]}
        //@ts-ignore
        dataSource={type === 'minerModal' ? minerModalData : dataStore[type]}
        pagination={false}
        loading={type === 'minerModal' ? minerModalLoading : loading}
        onRow={(row) => {
          return {
            onClick: () => {
              if (props.type === 'miners') {
                setMinerRpw(row)
                setMinerModalOpen(true)
              }
            }
          }
        }}
      />
      <MinerModal open={minerModalOpen} onModalChange={(v) => setMinerModalOpen(v)} minerItem={minerRow} />
      <CreateMinerModal open={createModalOpen} onModalChange={(v) => setCreateModalOpen(v)} minerItem={minerRow} />
    </div>

  )
};

export default CommonTable;