const menuList = [
  {
    title: '首页',
    key: '/home'
  },
  {
    title: '文章管理',
    key: '/article',
    children: [
      {
        title: '发布文章',
        key: '/article/create'
      },
      {
        title: '文章列表',
        key: '/article'
      },
    ]
  },
  {
    title: '系统设置',
    key: '/system/label'
  },
  {
    title: '权限设置',
    key: '/permission'
  },
];
export default menuList;
