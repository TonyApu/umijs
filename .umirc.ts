import { defineConfig } from 'umi';

export default defineConfig({
  model: {},
  antd: {},
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
      access: 'noFilter'
    },
    {
      name: 'Trang Chủ',
      path: '/home',
      component: './Home',
      wrappers: ['@/wrappers/auth'],
      access: 'noFilter'
    },
    {
      path: '/admin',
      component: './Admin',
      name: 'Admin',
      wrappers: ['@/wrappers/auth'],
      access: 'adminRouteFilter'
    },
    {
      path: '/user',
      component: './User',
      name: 'User',
      wrappers: ['@/wrappers/auth'],
      access: 'userRouterFiler'
    },
    {
      path: '/products',
      component: './Products',
      name: 'Menu',
      wrappers: ['@/wrappers/auth'],
      access: 'adminRouteFilter'
    },
    {
      path: '/logout',
      component: './Logout',
      name: 'Log out',
      wrappers: ['@/wrappers/auth'],
      access: 'noFilter'
    },
    {
      path: '/*',
      component: './NotFound',
      access: 'noFilter'
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
  access: {
    strictMode: true,
  },
});
