import React, { ReactNode, lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../page/Home"));

// const Login = lazy(() => import("../page/Login"));

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>{children}</React.Suspense>
  );
};

export const routers: RouteObject[] = [
  {
    path: "/",
    element: lazyLoad(<Home />),
    //路由嵌套，子路由的元素需使用<Outlet />
    // children: [
    //   {
    //     index: true,
    //     element: lazyLoad(<Home />),
    //   },
    //   {
    //     path: "/satrt/*",
    //     element: lazyLoad(<User />),
    //   },

    //   {
    //     path: "/first/*",
    //     element: lazyLoad(<Detail />),
    //   },
    // ],
  },

  // {
  //   path: "/login",
  //   element: lazyLoad(<Login />),
  // },
];
