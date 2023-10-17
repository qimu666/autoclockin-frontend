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
    tooltip: "职校家园账号",
    title: '职校家园账号',
    dataIndex: 'clockInAccount',
    key: "clockInAccount",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '职校家园账号是必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    tooltip: "职校家园密码",
    title: '职校家园密码',
    dataIndex: 'clockPassword',
    valueType:'password',
    key: "clockPassword",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '职校家园密码是必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: <span>设备类型 ( 例: Xiaomi|Mi 10 Pro|11 ) <br/>格式:手机品牌英文名称|手机代号|安卓系统版本</span>,
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
    title: <span>真实设备id,或者<a target={"_blank"} href={'http://did.sxba.xuanran.cc/'}
                                   rel="noreferrer">点我获取随机设备ID,获取后填入</a></span>,
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
export const AdminClockInInfoModalFormColumns: ProFormColumnsType<API.ClockInInfoAddRequest, "text">[] = [
  {
    title: 'id',
    valueType: 'index',
    dataIndex: 'id',
    hideInTable: true,
    key: "id"
  },
  {
    tooltip: "该自动打卡平台登录账号",
    title: '该自动打卡平台登录账号',
    dataIndex: 'userAccount',
    key: "userAccount",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '自动打卡平台账号',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    tooltip: "职校家园账号",
    title: '职校家园账号',
    dataIndex: 'clockInAccount',
    key: "clockInAccount",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '职校家园账号是必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    tooltip: "职校家园密码",
    title: '职校家园密码',
    dataIndex: 'clockPassword',
    valueType: 'password',
    key: "clockPassword",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '职校家园密码是必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: <span>设备类型 ( 例: Xiaomi|Mi 10 Pro|11 ) <br/>格式:手机品牌英文名称|手机代号|安卓系统版本</span>,
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
    title: <span>真实设备id,或者<a target={"_blank"} href={'http://did.sxba.xuanran.cc/'}
                                   rel="noreferrer">点我获取随机设备ID,获取后填入</a></span>,
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
