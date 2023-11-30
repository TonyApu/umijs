import { defineConfig } from 'umi';

export default defineConfig({
  model: {},
  antd: {
    dark: true,
    compact: true,
  },
  request: {},
  initialState: {},
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      component: './Login',
    },
    // {
    //   path: '/',
    //   component: '@/layouts/index',
    //   wrappers: ['@/wrappers/auth'],
    //   routes: [
    //     { path: '/home', component: '@/pages/Home/index' },
    //     { path: '/products', component: '@/pages/Products/index' },
    //   ],
    // },
    {
      name: 'Trang Chủ',
      path: '/home',
      component: './Home',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/products',
      component: './Products',
      name: 'Thực đơn',
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/logout',
      component: './Logout',
      name: 'Đăng xuất',
      wrappers: ['@/wrappers/auth'],
    },
  ],
  mock: {
    include: ['src/pages/**/_mock.ts'],
  },
  dva: {},
  layout: {
    // https://umijs.org/docs/max/layout-menu#构建时配置
    title: 'UmiJS',
    locale: true,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
});
