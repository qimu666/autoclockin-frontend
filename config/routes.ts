export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}, {
      name: '注册账号',
      path: '/user/register',
      component: './User/Register'
    },
    ],
  },
  {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {path: '/clockIn', name: '打卡信息', icon:'LoginOutlined', component: './User/ClockIn'},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {name: '查询表格', icon: 'table', path: '/admin/list', component: './Admin/ClockInInfoList'},
    ],
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
