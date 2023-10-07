import {Badge, Button, Card, Descriptions, DescriptionsProps, message, Popconfirm, Tooltip} from 'antd';
import React, {useEffect, useState} from "react";
import {
  isNotWriteUsingPOST,
  startingClockInUsingPOST,
  stopClockInUsingPOST,
  toClockInUsingPOST
} from "@/services/auto-clock-in/clockInController";
import {
  addClockInInfoUsingPOST,
  getClockInInfoByLoginUserIdUsingGET,
  updateClockInInfoUsingPOST
} from "@/services/auto-clock-in/clockInInfoController";
import {EditOutlined, PoweroffOutlined} from "@ant-design/icons";
import ModalForm from "@/pages/Admin/ClockInInfoList/components/ModalForm";
import ClockInInfoModalFormColumns from "@/pages/Admin/ClockInInfoList/components/ClockInColumns";
import {useModel} from "@umijs/max";
import EmailModal from "@/components/EmailModal";
import {userBindEmailUsingPOST, userUnBindEmailUsingPOST} from "@/services/auto-clock-in/userController";
import Settings from "../../../../config/defaultSettings";
import {valueLength} from '@/components/RightContent/AvatarDropdown';
import Paragraph from "antd/lib/typography/Paragraph";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const ClockIn: React.FC = () => {
  const [data, setDate] = useState<API.ClockInInfo>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loginUser} = initialState || {}
  const [loading, setLoading] = useState(false);
  const [notWrite, setNotWrite] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const statusEnum: any = {
    0: "未开启",
    1: "打卡中",
    2: "今日已打卡",
    3: "打卡失败"
  }
  const isNotWrite = async () => {
    const isWrite = await isNotWriteUsingPOST();
    if (isWrite.data) {
      setNotWrite(true)
      handleModalOpen(false)
      return
    }
  }

  const loadedData = async () => {
    await isNotWrite()
    setLoading(true)
    try {
      const res = await getClockInInfoByLoginUserIdUsingGET()
      if (res.data && res.code === 0) {
        setDate(res.data || {})
        setNotWrite(false)
      }
    } catch (e: any) {
      message.error(e.message)
    }
    setLoading(false)
  }

  useEffect(() => {
      loadedData()
    },
    [])

  const handleBindEmailSubmit = async (values: API.UserBindEmailRequest) => {
    try {
      // 绑定邮箱
      const res = await userBindEmailUsingPOST({
        ...values,
      });
      if (res.data && res.code === 0) {
        setInitialState({loginUser: res.data, settings: Settings})
        setOpenEmailModal(false)
        message.success('绑定成功');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '操作失败！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const handleUnBindEmailSubmit = async (values: API.UserUnBindEmailRequest) => {
    try {
      // 绑定邮箱
      const res = await userUnBindEmailUsingPOST({...values});
      if (res.data && res.code === 0) {
        setInitialState({loginUser: res.data, settings: Settings})
      }
      setOpenEmailModal(false)
      message.success('解绑成功');
    } catch (error) {
      const defaultLoginFailureMessage = '操作失败！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleUpdate = async (fields: API.ClockInInfoAddRequest) => {
    const hide = message.loading('修改中...');
    try {
      hide();
      const res = await updateClockInInfoUsingPOST({...fields});
      if (res.data && res.code === 0) {
        message.success('修改成功');
        handleUpdateModalOpen(false);
        loadedData()
      }
    } catch (error: any) {
      message.error(error.message);
      handleUpdateModalOpen(false);
    }
  };
  const handleAdd = async (fields: API.ClockInInfoAddRequest) => {
    const hide = message.loading('添加中...');
    try {
      const res = await addClockInInfoUsingPOST({...fields});
      hide();
      if (res.data && res.code === 0) {
        message.success('添加成功');
        handleModalOpen(false);
        loadedData()
      }
      return true;
    } catch (error: any) {
      message.error(error.message);
      handleModalOpen(false)
    }
  };
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '设备型号',
      children:
        <Paragraph copyable={valueLength(data?.deviceType)}>
          {data?.deviceType}
        </Paragraph>
    },
    {
      key: '5',
      label: '打卡时间',
      children: <p>{data?.clockInTime}</p>,
    },
    {
      key: '7',
      label: '通知邮箱',
      children: <Paragraph
        copyable={valueLength(loginUser?.email)}
      >
        {valueLength(loginUser?.email) ? loginUser?.email : '未绑定邮箱'}
      </Paragraph>,
    },
    {
      key: '2',
      label: '打卡状态',
      children: <>
        {/*@ts-ignore*/}
        {data?.status === 1 ? <Badge status="processing" text={statusEnum[data?.status]}/> : null}
        {data?.status === 0 ? <Badge status="default" text={statusEnum[data?.status]}/> : null}
        {data?.status === 2 ? <Badge status="success" text={statusEnum[data?.status]}/> : null}
        {data?.status === 3 ? <Badge status="error" text={statusEnum[data?.status]}/> : null}
      </>,
    },
    {
      key: '3',
      label: '设备ID',
      children: <Paragraph copyable={valueLength(data?.deviceId)}>{data?.deviceId}</Paragraph>,
    },
    {
      key: '4',
      label: '打卡地址',
      children: <Paragraph copyable={valueLength(data?.address)}>{data?.address}</Paragraph>,
    },
    {
      key: '6',
      label: '创建时间',
      children: <p>{formatDate(data?.createTime)}</p>,
    },
  ];
  const confirm = async () => {
    if (!data || !data.id) {
      message.error("参数有误")
      return
    }
    const res = await stopClockInUsingPOST({id: data?.id})
    if (res.data && res.code === 0) {
      message.success('打卡暂停成功');
      setTimeout(() => {
        loadedData()
      }, 300)
    }
  };

  const cancel = () => {
    message.success('取消成功');
  };

  return (
    <>
      <Card title={'我的打卡信息'} extra={
        <>
          <Tooltip title={"用于接收打卡通知信息"}>
            <Button onClick={() => {
              setOpenEmailModal(true)
            }
            }>{loginUser?.email ? '更新邮箱' : "绑定邮箱"}</Button>
          </Tooltip>
        </>
      } hoverable={true} actions={[<>
        <span onClick={() => {
          if (notWrite) {
            message.error("请先添加打卡信息")
            handleModalOpen(true)
            return
          }
          handleUpdateModalOpen(true)
        }}>修改打卡信息<br/><EditOutlined key="edit"/></span>
      </>
        , <>
          {data?.status === 0 ?
            <span onClick={async () => {
              const res = await startingClockInUsingPOST({id: data?.id})
              if (res.data && res.code === 0) {
                if (!loginUser?.email) {
                  message.error("您未绑定邮箱，将无法接收到打卡通知！")
                }
                await toClockInUsingPOST()
                message.success('打卡开启成功');
                setTimeout(() => {
                  loadedData()
                }, 300)
              }
            }}
                  style={{fontSize: 14, color: "#3498db"}}>
            开始打卡 <br/><PoweroffOutlined
              key={'PoweroffOutlined'}/></span> : null}
          {data?.status === 1 ?
            <Popconfirm
              key={'Delete'}
              title="请确认是否关闭打卡!"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
            <span style={{fontSize: 14, color: "red"}}>
            暂停打卡 <br/><PoweroffOutlined
              key={'PoweroffOutlined'}/>
            </span>
            </Popconfirm> : null
          }
          {
            data?.status === 2 ?
              <Popconfirm
                key={'Delete'}
                title="请确认是否关闭打卡!"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
            <span style={{fontSize: 14, color: "#52c41a"}}>今日已打卡
              <br/><PoweroffOutlined
                key={'PoweroffOutlined'}/></span>
              </Popconfirm>
              : null
          }
        </>,
      ]}>
        {data ? <Descriptions column={1} items={items}/> : <p>暂无打卡信息</p>}
      </Card>
      <ModalForm
        title={"添加打卡信息"}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (values) => {
          await handleAdd(values)
        }}
        onCancel={() => handleModalOpen(false)}
        columns={ClockInInfoModalFormColumns} width={"400px"}
      />
      <ModalForm
        title={"修改打卡信息"}
        value={data}
        open={() => {
          return updateModalOpen
        }}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (values) => {
          await handleUpdate(values)
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={ClockInInfoModalFormColumns} width={"400px"}
      />
      <EmailModal unbindSubmit={handleUnBindEmailSubmit} bindSubmit={handleBindEmailSubmit} data={loginUser}
                  onCancel={() => setOpenEmailModal(false)}
                  open={openEmailModal}/>
    </>
  );
};

export default ClockIn;
