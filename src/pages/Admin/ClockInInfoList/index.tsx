import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import {
  addClockInInfoUsingPOST,
  deleteClockInInfoUsingPOST,
  listClockInInfoByPageUsingGET,
  updateClockInInfoUsingPOST
} from "@/services/auto-clock-in/clockInInfoController";
import {startingClockInUsingPOST, stopClockInUsingPOST} from "@/services/auto-clock-in/clockInController";
import ModalForm from "@/pages/Admin/ClockInInfoList/components/ModalForm";
import ClockInInfoModalFormColumns from "@/pages/Admin/ClockInInfoList/components/ClockInColumns";


const ClockInInfoList: React.FC = () => {
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ClockInInfo>();

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.ClockInInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addClockInInfoUsingPOST({
        ...fields,
      });
      if (res.data && res.code === 0) {
        hide();
        message.success('添加成功');
        return true;
      }
    } catch (error: any) {
      hide();
      message.error('添加失败! ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.ClockInInfoUpdateRequest) => {
    const hide = message.loading('修改中');
    try {
      const res = await updateClockInInfoUsingPOST({id: currentRow?.id, ...fields});
      if (res.data && res.code === 0) {
        hide();
        message.success('修改成功');
        return true;
      }
    } catch (error: any) {
      hide();
      message.error('修改失败' + error.message);
      return false;
    }
  };


  /**
   * @en-US Update node
   * @zh-CN 发布
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('启动中');
    if (!record) return true;
    try {
      const res = await startingClockInUsingPOST({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('启动成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 下线
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('暂停中');
    if (!record) return true;
    try {
      const res = await stopClockInUsingPOST({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('暂停成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.ClockInInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await deleteClockInInfoUsingPOST({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('删除成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败', error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const confirm = async () => {
    await handleRemove(currentRow as API.ClockInInfo);
  };

  const cancel = () => {
    message.success('取消成功');
  };

  const columns: ProColumns<API.ClockInInfo>[] = [
    {
      title: '打卡地址',
      dataIndex: 'address',
      copyable: true,
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      valueType: 'textarea',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '纬度',
      dataIndex: 'latitude',
      key: 'latitude',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
    }, {
      title: '经度',
      dataIndex: 'longitude',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '状态',
      filters: true,
      onFilter: true,
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        0: {
          text: '未开启',
          status: 'Default',
        },
        1: {
          text: '打卡中',
          status: 'Processing',
        },
        2: {
          text: '今日已打卡',
          status: 'Success',
        },
        3: {
          text: '打卡失败',
          status: 'Error',
        },
      },
    },
    {
      title: '打卡时间',
      dataIndex: 'clockInTime',
      valueType: 'time',
      key: 'clockInTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalOpen(true);
          }}
        >
          修改
        </a>,
        record.status === 0 ? (
          <a
            type="text"
            key="auditing"
            onClick={() => {
              handleOnline(record);
            }}
          >
            开始打卡
          </a>
        ) : null,
        record.status === 2 ? (
          <a
            type="text"
            key="online"
            onClick={() => {
              handleOnline(record);
            }}
          >
            暂停打卡
          </a>
        ) : null,
        record.status === 1 ? (
          <a
            type="text"
            key="offline"
            style={{color: "red"}}
            onClick={() => {
              handleOffline(record);
            }}
          >
            暂停打卡
          </a>
        ) : null,
        <Popconfirm
          key={'Delete'}
          title="请确认是否删除该打卡信息!"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a
            key="Remove"
            style={{color: "red"}}
            onClick={async () => {
              setCurrentRow(record);
            }}
          >
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ClockInInfo, API.ClockInInfo>
        headerTitle={'接口管理'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await listClockInInfoByPageUsingGET({...params})
          if (res.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total,
            }
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            }
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              // await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <ModalForm
        title={"添加打卡信息"}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.ClockInInfo);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={ClockInInfoModalFormColumns} width={"480px"}
        size={"large"}
      />
      <ModalForm
        title={"修改打卡信息"}
        open={() => {
          return updateModalOpen;
        }}
        value={currentRow}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.ClockInInfo);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={ClockInInfoModalFormColumns} width={"480px"}
        size={"large"}
      />

    </PageContainer>
  );
};
export default ClockInInfoList;
