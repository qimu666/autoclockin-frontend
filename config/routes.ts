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
  {path: '/clockIn', name: '打卡信息', icon:'LoginOutlined', component: './User/ClockIn'},
  {path: '/clockIn/:id', name: '打卡信息', icon:'LoginOutlined', component: './User/ClockIn',hideInMenu: true,},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {name: '打卡管理列表', icon: 'table', path: '/admin/list', component: './Admin/ClockInInfoList'},
    ],
  },
  {path: '/', redirect: '/clockIn'},
  {path: '*', layout: false, component: './404'},
];
