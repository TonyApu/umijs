// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","redirect":"/home","access":"noFilter","parentId":"ant-design-pro-layout","id":"1"},"2":{"path":"/login","access":"noFilter","parentId":"ant-design-pro-layout","id":"2"},"3":{"name":"Trang Chủ","path":"","access":"noFilter","parentId":"4","id":"3","originPath":"/home"},"4":{"path":"/home","isWrapper":true,"parentId":"ant-design-pro-layout","id":"4"},"5":{"path":"","name":"Admin","access":"adminRouteFilter","parentId":"6","id":"5","originPath":"/admin"},"6":{"path":"/admin","isWrapper":true,"parentId":"ant-design-pro-layout","id":"6"},"7":{"path":"","name":"User","access":"userRouterFiler","parentId":"8","id":"7","originPath":"/user"},"8":{"path":"/user","isWrapper":true,"parentId":"ant-design-pro-layout","id":"8"},"9":{"path":"","name":"Products","access":"adminRouteFilter","parentId":"10","id":"9","originPath":"/products"},"10":{"path":"/products","isWrapper":true,"parentId":"ant-design-pro-layout","id":"10"},"11":{"path":"","name":"Log out","access":"noFilter","parentId":"12","id":"11","originPath":"/logout"},"12":{"path":"/logout","isWrapper":true,"parentId":"ant-design-pro-layout","id":"12"},"13":{"path":"/*","access":"noFilter","parentId":"ant-design-pro-layout","id":"13"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__Login__index" */'@/pages/Login/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "wrappers__auth" */'@/wrappers/auth.js')),
'5': React.lazy(() => import(/* webpackChunkName: "p__Admin__index" */'@/pages/Admin/index.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "wrappers__auth" */'@/wrappers/auth.js')),
'7': React.lazy(() => import(/* webpackChunkName: "p__User__index" */'@/pages/User/index.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "wrappers__auth" */'@/wrappers/auth.js')),
'9': React.lazy(() => import(/* webpackChunkName: "p__Products__index" */'@/pages/Products/index.tsx')),
'10': React.lazy(() => import(/* webpackChunkName: "wrappers__auth" */'@/wrappers/auth.js')),
'11': React.lazy(() => import(/* webpackChunkName: "p__Logout__index" */'@/pages/Logout/index.tsx')),
'12': React.lazy(() => import(/* webpackChunkName: "wrappers__auth" */'@/wrappers/auth.js')),
'13': React.lazy(() => import(/* webpackChunkName: "p__NotFound__index" */'@/pages/NotFound/index.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'/Users/tony/Documents/MyApp/umi-dva/src/.umi/plugin-layout/Layout.tsx')),
},
  };
}
