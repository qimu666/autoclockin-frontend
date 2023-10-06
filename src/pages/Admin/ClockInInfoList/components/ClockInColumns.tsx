import {ProFormColumnsType} from '@ant-design/pro-components';

export const ClockInInfoModalFormColumns: ProFormColumnsType<API.ClockInInfo, "text">[] = [
  {
    title: 'id',
    valueType: 'index',
    dataIndex: 'id',
    hideInTable: true,
    key: "id"
  },
  {
    title: <span>设备类型 ( 例: Xiaomi|Mi 10 Pro|11 )</span>,
    dataIndex: 'deviceType',
    tooltip: "格式:手机品牌英文名称|手机代号|安卓系统版本",
    key: "deviceType",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '设备类型为必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '打卡时间 ( 若今日未打卡请往后偏移1分钟,不要设置为夜晚12点 )',
    dataIndex: 'clockInTime',
    key: 'clockInTime',
    valueType: "time",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '打卡时间必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    tooltip: "设备ID",
    title: <a target={"_blank"} href={'http://did.sxba.xuanran.cc/'} rel="noreferrer">点我获取随机设备ID,获取后填入</a>,
    dataIndex: 'deviceId',
    key: "deviceId",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '设备ID必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    tooltip: "要填写详细一些",
    title: '签到地址 例:中国福建省福州市鼓楼区洪山镇风湖路) 要填写详细一些',
    dataIndex: 'address',
    key: "address",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '签到地址必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
];

export default ClockInInfoModalFormColumns;
