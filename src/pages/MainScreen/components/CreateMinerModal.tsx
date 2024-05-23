import React, { useState } from 'react';
import { Button, Col, Form, FormInstance, FormProps, Input, InputNumber, Modal, Row, Select, message, } from 'antd';
import { MinerModalProps } from '../type';
import styles from './index.module.scss'
import { fetchCreateMiner } from '../../../services/mainscreen';


const CreateMinerModal = (props: MinerModalProps) => {
  const { open, onModalChange, minerItem } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Services.MainScreen.Res.MinerHistoryItem[]>()
  const formRef = React.createRef<FormInstance>();


  const handleCancel = () => {
    onModalChange(false);
  };

  const createMiner = async () => {
    try {
      setLoading(true);
      const formdata = await formRef.current?.getFieldsValue()
      //TODO: fetch api
      // const res = await fetchCreateMiner(formdata);
      message.info('Sorry, there was no time to implement the actual creation.');
      message.success('create success');
      onModalChange(false)
    } catch (e) {
      console.log('err: ', e);
    } finally {
      setLoading(false);
    }
  };

  type FieldType = {
    name?: string;
    planet?: string;
    travelSpeed?: number;
    carryCapacity?: number;
    miningSpeed?: number
    remember?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className={styles.minerModal}>
      <Modal width={450} title={`Create a miner`} open={open} onCancel={handleCancel} getContainer={false} destroyOnClose footer={null} >
        <Form
          className={styles.form}
          ref={formRef}
          name="basic"
          layout='vertical'
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark='optional'
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input miner name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Planet"
            name="planet"
            rules={[{ required: true, message: 'Please select your planet' }]}
          >
            <Select
              options={[
                {
                  value: 'Pl1',
                  label: 'Pl1',
                },
                {
                  value: 'Pl2',
                  label: 'Pl2',
                },
                {
                  value: 'Pl3',
                  label: 'Pl3',
                },
              ]} />
          </Form.Item>

          <div className={styles.formSubTitle}>Assign points</div>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item<FieldType>
                label="carryCapacity"
                name="carryCapacity"
                rules={[{ required: true, message: 'Please input your carryCapacity!' }]}
              >
                <InputNumber min={0} max={200} />
              </Form.Item>

            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item<FieldType>
                label="travelSpeed"
                name="travelSpeed"
                rules={[{ required: true, message: 'Please input your travelSpeed!' }]}
              >
                <InputNumber min={0} max={200} />
              </Form.Item>

            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item<FieldType>
                label="miningSpeed"
                name="miningSpeed"
                rules={[{ required: true, message: 'Please input your miningSpeed!' }]}
              >
                <InputNumber min={0} max={200} />
              </Form.Item>

            </Col>

          </Row>

          <div className={styles.btnWrapper}>
            <Button type="primary" htmlType="submit" className={styles.btn} onClick={createMiner}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateMinerModal;